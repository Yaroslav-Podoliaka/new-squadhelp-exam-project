import React from 'react';
import moment from 'moment';
import CONSTANTS from '../../constants';
import styles from './ContestBox.module.sass';

const ContestBox = (props) => {
  // Объявление функции getTimeStr для форматирования времени
  const getTimeStr = () => {
    // Вычисление разницы между текущим временем и временем создания контеста
    const diff = moment.duration(moment().diff(moment(props.data.createdAt)));
    // Инициализация строки для отображения времени
    let str = '';
    // Добавление дней, если разница в днях не равна 0
    if (diff._data.days !== 0) str = `${diff._data.days}d `;
    // Добавление часов, если разница в часах не равна 0
    if (diff._data.hours !== 0) str += `${diff._data.hours}h`;
    // Если строка пуста, установка значения "меньше часа"
    if (str.length === 0) str = 'less than one hour';
    // Возвращение строки с отформатированным временем
    return str;
  };
  // Объявление функции для получения предпочтительного контеста
  const getPreferenceContest = () => {
    const { data } = props;
    // Если тип контеста — NAME_CONTEST, возвращаем тип имя
    if (data.contestType === CONSTANTS.NAME_CONTEST) return data.typeOfName;
    // Если тип контеста — LOGO_CONTEST, возвращаем стиль бренд
    if (data.contestType === CONSTANTS.LOGO_CONTEST) return data.brandStyle;
    // В противном случае возвращаем тип слоган
    return data.typeOfTagline;
  };
  // Объявление функции для преобразования первой буквы в верхний регистр
  const ucFirstLetter = (string) =>
  // Возвращение строки с первой заглавной буквой
    string.charAt(0).toUpperCase() + string.slice(1);

  const { id, title, contestType, prize, count, /**goToExtended**/ } = props.data;
  return (
    <div
      className={styles.contestBoxContainer}
      onClick={() => props.goToExtended(id)}
    >
      <div className={styles.mainContestInfo}>
        <div className={styles.titleAndIdContainer}>
        {/* Отображение заголовка контеста */}
          <span className={styles.title}>{title}</span>
          {/* Отображение ID контеста */}
          <span className={styles.id}>{`(#${id})`}</span>
        </div>
        <div className={styles.contestType}>
          {/* Отображение типа и предпочтительного контеста */}
          <span>{`${ucFirstLetter(
            contestType
          )} / ${getPreferenceContest()}`}</span>
        </div>
        <div className={styles.contestType}>
          <span>
            This is an Invitation Only Contest and is only open to those
            Creatives who have achieved a Tier A status.
          </span>
        </div>
        <div className={styles.prizeContainer}>
          <div className={styles.guaranteedContainer}>
            <div>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}smallCheck.png`}
                alt='check'
              />
            </div>
            <span>Guaranteed prize</span>
          </div>
          <div className={styles.prize}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}diamond.png`}
              alt='diamond'
            />
            <span>{`$${prize}`}</span>
          </div>
        </div>
      </div>
      <div className={styles.entryAndTimeContainer}>
        <div className={styles.entriesContainer}>
          <div className={styles.entriesCounter}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}entrieImage.png`}
              alt='logo'
            />
            <span>{count}</span>
          </div>
          <span>Entries</span>
        </div>
        <div className={styles.timeContainer}>
          <span className={styles.timeContest}>{getTimeStr()}</span>
          <span>Going</span>
        </div>
      </div>
    </div>
  );
};

export default ContestBox;
