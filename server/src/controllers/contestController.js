require('dotenv').config();
const nodemailer = require('nodemailer');
const db = require('../db/models');
const ServerError =require('../errors/ServerError');
const contestQueries = require('./queries/contestQueries');
const userQueries = require('./queries/userQueries');
const controller = require('../socketInit');
const UtilFunctions = require('../utils/functions');
const CONSTANTS = require('../constants/constants');
// Получение данных для конкурса (преимущественных характеристик)
module.exports.dataForContest = async (req, res, next) => {
  const response = {};
  try {
    const { body: { characteristic1, characteristic2 } } = req;
    console.log(req.body, characteristic1, characteristic2);
    const types = [characteristic1, characteristic2, 'industry'].filter(Boolean);

    const characteristics = await db.Select.findAll({
      where: {
        type: {
          [ db.Sequelize.Op.or ]: types,
        },
      },
    });
    if (!characteristics) {
      return next(new ServerError());
    }
    characteristics.forEach(characteristic => {
      if (!response[ characteristic.type ]) {
        response[ characteristic.type ] = [];
      }
      response[ characteristic.type ].push(characteristic.describe);
    });
    res.send(response);
  } catch (err) {
    console.log(err);
    next(new ServerError('cannot get contest preferences'));
  }
};
// Получение информации о конкурсе по его ID
module.exports.getContestById = async (req, res, next) => {
  console.log('Заголовки contestController: ', req.headers);
  try {
    // Получение информации о конкурсе из базы данных
    let contestInfo = await db.Contest.findOne({
      where: { id: req.headers.contestid },
      order: [
        [db.Offer, 'id', 'asc'],
      ],
      include: [
        {
          model: db.User,
          required: true,
          attributes: {
            exclude: [
              'password',
              'role',
              'balance',
              'accessToken',
            ],
          },
        },
        {
          model: db.Offer,
          required: false,
          where: req.tokenData.role === CONSTANTS.CREATOR
            ? { userId: req.tokenData.userId }
            : {},
          attributes: { exclude: ['userId', 'contestId'] },
          include: [
            {
              model: db.User,
              required: true,
              attributes: {
                exclude: [
                  'password',
                  'role',
                  'balance',
                  'accessToken',
                ],
              },
            },
            {
              model: db.Rating,
              required: false,
              where: { userId: req.tokenData.userId },
              attributes: { exclude: ['userId', 'offerId'] },
            },
          ],
        },
      ],
    });
    contestInfo = contestInfo.get({ plain: true });
    // Форматирование информации о предложениях
    contestInfo.Offers.forEach(offer => {
      if (offer.Rating) {
        offer.mark = offer.Rating.mark;
      }
      delete offer.Rating;
    });
    res.send(contestInfo);
  } catch (err) {
    next(new ServerError());
  }
};
// Загрузка файла конкурса
module.exports.downloadFile = async (req, res, next) => {
  const file = CONSTANTS.CONTESTS_DEFAULT_DIR + req.params.fileName;
  res.download(file);
};
// Обновление информации о конкурсе
module.exports.updateContest = async (req, res, next) => {
  // Если загружен файл, добавляем его информацию в тело запроса
  if (req.file) {
    req.body.fileName = req.file.filename;
    req.body.originalFileName = req.file.originalname;
  }
  const contestId = req.body.contestId;
  delete req.body.contestId;
  try {
    // Обновление конкурса в базе данных
    const updatedContest = await contestQueries.updateContest(req.body, {
      id: contestId,
      userId: req.tokenData.userId,
    });
    res.send(updatedContest);
  } catch (err) {
    next(err);
  }
};
// Создание нового предложения для конкурса
module.exports.setNewOffer = async (req, res, next) => {
  const obj = {};
  // Если конкурс - это конкурс на логотип, добавляем информацию о файле
  if (req.body.contestType === CONSTANTS.LOGO_CONTEST) {
    obj.fileName = req.file.filename;
    obj.originalFileName = req.file.originalname;
  } else {
    // Иначе добавляем текстовое предложение
    obj.text = req.body.offerData;
  }
  obj.userId = req.tokenData.userId;
  obj.contestId = req.body.contestId;
  try {
    // Создание нового предложения в базе данных
    const result = await contestQueries.createOffer(obj);
    delete result.contestId;
    delete result.userId;
    // Отправка уведомления о создании предложения
    controller.getNotificationController().emitEntryCreated(
      req.body.customerId);
    const User = Object.assign({}, req.tokenData, { id: req.tokenData.userId });
    res.send(Object.assign({}, result, { User }));
  } catch (err) {
    next(new ServerError());
  }
};
// Создаем транспорт для отправки электронной почты
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_HOST_USER,
    pass: process.env.EMAIL_HOST_PASS
  }
});

// Функция для отправки электронной почты пользователю
const sendEmail = async (recipientEmail, subject, text) => {
  try {
    // Отправляем письмо через транспортер
    await transporter.sendMail({
      // Адрес отправителя
      from: `"Squadhelp" <${process.env.EMAIL_HOST_USER_ADDRESS}>`,
      to: recipientEmail, // Адрес получателя
      subject, // Тема письма
      text // Текст письма
    });
    // Сообщение об успешной отправке
    console.log('Email sent successfully');
  } catch (error) {
    // Выводим ошибку, если отправка не удалась
    console.error('Error sending email: ', error);
  }
};
// Функция для получения адреса электронной почты по id пользователя
const getEmailByCreatorId = async (creatorId) => {
  try {
    // Ищем пользователя в базе данных по его id
    const user = await db.User.findOne({
      attributes: ['email'], // Получаем только адрес электронной почты
      where: { id: creatorId } // Условие поиска по id пользователя
    });
    // Возвращаем адрес электронной почты пользователя, если он найден
    return user ? user.email : null;
  } catch (error) {
    // Выводим ошибку, если запрос не удался
    console.error('Error fetching user email: ', error);
    return null; // Возвращаем null, если не удалось найти пользователя
  }
};
// Отклонение предложения
const rejectOffer = async (offerId, creatorId, contestId) => {
  // Обновление статуса предложения
  const rejectedOffer = await contestQueries.updateOffer(
    { status: CONSTANTS.OFFER_STATUS_REJECTED }, { id: offerId });
  // Отправка уведомления об отклонении предложения
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of yours offers was rejected', contestId);
  const recipientEmail = await getEmailByCreatorId(creatorId);
  if (recipientEmail) {
    // Отправка электронного письма пользователю
    sendEmail(recipientEmail, 'Offer rejected', 'Your offer has been rejected.');
  } else {
    console.error('User not found or email is not available');
  }
  return rejectedOffer;
};
// Принятие предложения
const resolveOffer = async (
  contestId, creatorId, orderId, offerId, priority, transaction) => {
  // Обновление статуса конкурса и баланса пользователя
  const finishedContest = await contestQueries.updateContestStatus({
    status: db.sequelize.literal(`   CASE
            WHEN "id"=${ contestId }  AND "orderId"='${ orderId }' THEN '${ CONSTANTS.CONTEST_STATUS_FINISHED }'
            WHEN "orderId"='${ orderId }' AND "priority"=${ priority +
    1 }  THEN '${ CONSTANTS.CONTEST_STATUS_ACTIVE }'
            ELSE '${ CONSTANTS.CONTEST_STATUS_PENDING }'
            END
    `),
  }, { orderId }, transaction);
  await userQueries.updateUser(
    { balance: db.sequelize.literal('balance + ' + finishedContest.prize) },
    creatorId, transaction);
  // Обновление статуса предложений
  const updatedOffers = await contestQueries.updateOfferStatus({
    status: db.sequelize.literal(` CASE
            WHEN "id"=${ offerId } THEN '${ CONSTANTS.OFFER_STATUS_WON }'
            ELSE '${ CONSTANTS.OFFER_STATUS_REJECTED }'
            END
    `),
  }, {
    contestId,
  }, transaction);
  transaction.commit();
  const arrayRoomsId = [];
  updatedOffers.forEach(offer => {
    if (offer.status === CONSTANTS.OFFER_STATUS_REJECTED && creatorId !==
      offer.userId) {
      arrayRoomsId.push(offer.userId);
    }
  });
  // Отправка уведомлений об изменении статуса предложений
  controller.getNotificationController().emitChangeOfferStatus(arrayRoomsId,
    'Someone of yours offers was rejected', contestId);
  controller.getNotificationController().emitChangeOfferStatus(creatorId,
    'Someone of your offers WIN', contestId);
  const recipientEmail = await getEmailByCreatorId(creatorId);
  if (recipientEmail) {
    // Отправка электронного письма пользователю
    sendEmail(recipientEmail, 'Offer Accepted', 'Congratulations! Your offer has been accepted.');
  } else {
    console.error('User not found or email is not available');
  }
  return updatedOffers[0].dataValues;
};
// Установка статуса предложения
module.exports.setOfferStatus = async (req, res, next) => {
  let transaction;
  try {
    if (req.body.command === 'reject') {
      // Отклонение предложения
      const offer = await rejectOffer(req.body.offerId, req.body.creatorId,
        req.body.contestId, req.body.recipientEmail);
      res.send(offer);
    } else if (req.body.command === 'resolve') {
      // Принятие предложения
      transaction = await db.sequelize.transaction();
      const winningOffer = await resolveOffer(req.body.contestId,
        req.body.creatorId, req.body.orderId, req.body.offerId,
        req.body.priority, transaction);
      res.send(winningOffer);
    }
  } catch (err) {
    if (transaction) {
      transaction.rollback();
    }
    next(err);
  }
};
// Получение конкурсов пользователя
module.exports.getCustomersContests = (req, res, next) => {
  db.Contest.findAll({
    where: { status: req.headers.status, userId: req.tokenData.userId },
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    order: [['id', 'DESC']],
    include: [
      {
        model: db.Offer,
        required: false,
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError(err));
    });
};
// Получение всех конкурсов
module.exports.getContests = (req, res, next) => {
  // Создание условий для запроса
  const predicates = UtilFunctions.createWhereForAllContests(req.body.typeIndex,
    req.body.contestId, req.body.industry, req.body.awardSort);
  // Получение всех конкурсов из базы данных
  db.Contest.findAll({
    where: predicates.where,
    order: predicates.order,
    limit: req.body.limit,
    offset: req.body.offset ? req.body.offset : 0,
    include: [
      {
        model: db.Offer,
        required: req.body.ownEntries,
        where: req.body.ownEntries ? { userId: req.tokenData.userId } : {},
        attributes: ['id'],
      },
    ],
  })
    .then(contests => {
      contests.forEach(
        contest => contest.dataValues.count = contest.dataValues.Offers.length);
      let haveMore = true;
      if (contests.length === 0) {
        haveMore = false;
      }
      res.send({ contests, haveMore });
    })
    .catch(err => {
      next(new ServerError(err));
    });
};
