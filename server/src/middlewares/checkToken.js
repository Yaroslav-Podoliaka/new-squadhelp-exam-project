const jwt = require('jsonwebtoken');
const CONSTANTS = require('../constants/constants');
const TokenError = require('../errors/TokenError');
const userQueries =require('../controllers/queries/userQueries');
// Middleware для проверки авторизации
module.exports.checkAuth = async (req, res, next) => {
  // Извлекаем токен доступа из заголовков запроса
  const accessToken = req.headers.authorization;
  // Проверяем, существует ли токен доступа
  if (!accessToken) {
    // Если токен отсутствует, вызываем ошибку TokenError с сообщением "need token"
    return next(new TokenError('need token'));
  }
  try {
    // Верифицируем токен доступа, используя секретный ключ из CONSTANTS.JWT_SECRET
    const tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    // Находим пользователя по id, полученному из верифицированного токена
    const foundUser = await userQueries.findUser({ id: tokenData.userId });
    // Отправляем данные пользователя в ответе на запрос
    res.send({
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      role: foundUser.role,
      id: foundUser.id,
      avatar: foundUser.avatar,
      displayName: foundUser.displayName,
      balance: foundUser.balance,
      email: foundUser.email,
    });
  } catch (err) {
    // Если возникает ошибка при верификации токена или поиске пользователя, вызываем ошибку TokenError
    next(new TokenError());
  }
};
// Middleware для проверки наличия токена без верификации
module.exports.checkToken = async (req, res, next) => {
  // Извлекаем токен доступа из заголовков запроса
  const accessToken = req.headers.authorization;
  console.log(req.headers);
  // Проверяем, существует ли токен доступа
  if (!accessToken) {
    // Если токен отсутствует, вызываем ошибку TokenError с сообщением "need token"
    return next(new TokenError('need token'));
  }
  try {
    // Верифицируем токен доступа, используя секретный ключ из CONSTANTS.JWT_SECRET
    req.tokenData = jwt.verify(accessToken, CONSTANTS.JWT_SECRET);
    // Если верификация прошла успешно, передаем управление следующему обработчику в цепочке middleware
    next();
  } catch (err) {
    // Если возникает ошибка при верификации токена, вызываем ошибку TokenError
    next(new TokenError());
  }
};
