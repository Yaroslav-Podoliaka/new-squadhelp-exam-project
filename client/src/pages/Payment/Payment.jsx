import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import PayForm from '../../components/PayForm/PayForm';
import CONSTANTS from '../../constants';
import Logo from '../../components/Logo';
import Error from '../../components/Error/Error';
import styles from './Payment.module.sass';

const Payment = (props) => {
  const navigate = useNavigate();
  // Обработчик отправки формы оплаты
  const pay = (values) => {
    // Получаем данные о конкурсах из Redux хранилища
    const { contests } = props.contestCreationStore;
    // Преобразуем объект конкурсов в массив
    const contestArray = Object.keys(contests).map((key) => ({
      ...contests[key],
    }));
    // Извлекаем данные из формы оплаты
    const { number, expiry, cvc } = values;
    // Создаем объект FormData для передачи данных
    const data = new FormData();
    // Добавляем файлы конкурсов в FormData
    for (let i = 0; i < contestArray.length; i++) {
      data.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }
    // Добавляем данные карты оплаты в FormData
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    // Вызываем Redux action для отправки данных
    props.pay({
      data: { formData: data },
      navigate: navigate,
    });
  };
  // Обработчик кнопки "Back"
  const goBack = () => {
    // Используем -1 для перехода назад
    navigate(-1);
  };
  // Извлекаем данные из Redux хранилища
  // const { contests } = props.contestCreationStore;
  const { error } = props.payment;
  const { clearPaymentStore } = props;
  // Если нет данных о конкурсах, перенаправляем на страницу начала конкурса
  // if (isEmpty(contests)) {
  //   navigate('/startContest');
  // }

  return (
    <div>
      <div className={styles.header}>
        <Logo
          src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
          alt="blue-logo"
        />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>
          {/* Рендер компонента ошибки, если есть ошибка */}
          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}
          {/* Рендер компонента формы оплаты */}
          <PayForm sendRequest={pay} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>
          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>
            <span className={styles.packagePrice}>$100 USD</span>
          </div>
          <div className={styles.resultPriceContainer}>
            <span>Total:</span>
            <span>$100.00 USD</span>
          </div>
          {/* Ссылка на ввод промокода */}
          <a href="http://www.google.com">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};
// Функция для подключения состояния из Redux к компоненту
const mapStateToProps = (state) => ({
  payment: state.payment,
  contestCreationStore: state.contestCreationStore,
});
// Функция для подключения actions из Redux к компоненту
const mapDispatchToProps = (dispatch) => ({
  pay: ({ data, navigate, }) => dispatch(pay({ data, navigate })),
  clearPaymentStore: () => dispatch(clearPaymentStore()),
});
// Экспорт компонента, подключенного к Redux
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

// import React from 'react';
// import { connect } from 'react-redux';
// import isEmpty from 'lodash/isEmpty';
// import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
// import PayForm from '../../components/PayForm/PayForm';
// import CONSTANTS from '../../constants';
// import Logo from '../../components/Logo';
// import Error from '../../components/Error/Error';
// import styles from './Payment.module.sass';

// const Payment = (props) => {
//   const pay = (values) => {
//     const { contests } = props.contestCreationStore;
//     const contestArray = [];
//     Object.keys(contests).forEach((key) =>
//       contestArray.push({ ...contests[key] })
//     );
//     const { number, expiry, cvc } = values;
//     const data = new FormData();
//     for (let i = 0; i < contestArray.length; i++) {
//       data.append('files', contestArray[i].file);
//       contestArray[i].haveFile = !!contestArray[i].file;
//     }
//     data.append('number', number);
//     data.append('expiry', expiry);
//     data.append('cvc', cvc);
//     data.append('contests', JSON.stringify(contestArray));
//     data.append('price', '100');
//     props.pay({
//       data: {
//         formData: data,
//       },
//       history: props.history,
//     });
//   };

//   const goBack = () => {
//     props.history.goBack();
//   };

//   const { contests } = props.contestCreationStore;
//   const { error } = props.payment;
//   const { clearPaymentStore } = props;
//   if (isEmpty(contests)) {
//     props.history.replace('startContest');
//   }
//   return (
//     <div>
//       <div className={styles.header}>
//         <Logo
//           src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
//           alt="blue-logo"
//         />
//       </div>
//       <div className={styles.mainContainer}>
//         <div className={styles.paymentContainer}>
//           <span className={styles.headerLabel}>Checkout</span>
//           {error && (
//             <Error
//               data={error.data}
//               status={error.status}
//               clearError={clearPaymentStore}
//             />
//           )}
//           <PayForm sendRequest={pay} back={goBack} isPayForOrder />
//         </div>
//         <div className={styles.orderInfoContainer}>
//           <span className={styles.orderHeader}>Order Summary</span>
//           <div className={styles.packageInfoContainer}>
//             <span className={styles.packageName}>Package Name: Standard</span>
//             <span className={styles.packagePrice}>$100 USD</span>
//           </div>
//           <div className={styles.resultPriceContainer}>
//             <span>Total:</span>
//             <span>$100.00 USD</span>
//           </div>
//           <a href="http://www.google.com">Have a promo code?</a>
//         </div>
//       </div>
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   payment: state.payment,
//   contestCreationStore: state.contestCreationStore,
// });

// const mapDispatchToProps = (dispatch) => ({
//   pay: ({ data, history }) => dispatch(pay({ data, history })),
//   clearPaymentStore: () => dispatch(clearPaymentStore()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Payment);
