import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { saveContestToStore } from '../../store/slices/contestCreationSlice';
import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
// import Header from '../../components/Header/Header';
import styles from './ContestCreationPage.module.sass';

const ContestCreationPage = (props) => {
  const navigate = useNavigate();
  // Создаем ref для доступа к форме
  const formRef = useRef();
  // Получаем данные о текущем конкурсе из хранилища
  const contestData = props.contestCreationStore.contests[props.contestType]
  // || { contestType: props.contestType };
    ? props.contestCreationStore.contests[props.contestType]
    : { contestType: props.contestType };
  // Обработчик события отправки формы
  const handleSubmit = (values) => {
    // Сохраняем данные о конкурсе в хранилище
    props.saveContest({ type: props.contestType, info: values });
    // Определяем следующий маршрут в зависимости от типа конкурса и стадии
    const route =
      props.bundleStore.bundle[props.contestType] === 'payment'
        ? '/payment'
        : `${props.bundleStore.bundle[props.contestType]}Contest`;
        // Переходим на следующую страницу
    navigate(route);
  };
  // Функция для вызова отправки формы
  const submitForm = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  // Если нет данных о бандле, перенаправляем на страницу начала конкурса
  !props.bundleStore.bundle && navigate('/startContest');
  // if (!props.bundleStore.bundle) {
  //   navigate('/startContest');
  //   return null;
  // }

  return (
    <div>
      {/* <Header /> */}
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{props.title}</h2>
          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>
        <ProgressBar currentStep={2} />
      </div>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {/* Форма для заполнения данных о конкурсе */}
          <ContestForm
            contestType={props.contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>
      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          {/* Кнопки "Back" и "Next" */}
          <div className={styles.buttonsContainer}>
            <BackButton />
            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
// Функция для подключения состояния из Redux к компоненту
const mapStateToProps = (state) => {
  const { contestCreationStore, bundleStore } = state;
  return { contestCreationStore, bundleStore };
};
// Функция для подключения actions из Redux к компоненту
const mapDispatchToProps = (dispatch) => ({
  saveContest: (data) => dispatch(saveContestToStore(data)),
});
// Экспорт компонента, подключенного к Redux
export default connect(mapStateToProps, mapDispatchToProps)(ContestCreationPage);

// import React, { useRef } from 'react';
// import { connect } from 'react-redux';
// import styles from './ContestCreationPage.module.sass';
// import { saveContestToStore } from '../../store/slices/contestCreationSlice';
// import NextButton from '../../components/NextButton/NextButton';
// import ContestForm from '../../components/ContestForm/ContestForm';
// import BackButton from '../../components/BackButton/BackButton';
// import ProgressBar from '../../components/ProgressBar/ProgressBar';
// import Footer from '../../components/Footer/Footer';
// import Header from '../../components/Header/Header';

// const ContestCreationPage = (props) => {
//   const formRef = useRef();
//   const contestData = props.contestCreationStore.contests[props.contestType]
//     ? props.contestCreationStore.contests[props.contestType]
//     : { contestType: props.contestType };

//   const handleSubmit = (values) => {
//     props.saveContest({ type: props.contestType, info: values });
//     const route =
//       props.bundleStore.bundle[props.contestType] === 'payment'
//         ? '/payment'
//         : `${props.bundleStore.bundle[props.contestType]}Contest`;
//     props.history.push(route);
//   };

//   const submitForm = () => {
//     if (formRef.current) {
//       formRef.current.handleSubmit();
//     }
//   };

//   !props.bundleStore.bundle && props.history.replace('/startContest');

//   return (
//     <div>
//       <Header />
//       <div className={styles.startContestHeader}>
//         <div className={styles.startContestInfo}>
//           <h2>{props.title}</h2>
//           <span>
//             Tell us a bit more about your business as well as your preferences
//             so that creatives get a better idea about what you are looking for
//           </span>
//         </div>
//         <ProgressBar currentStep={2} />
//       </div>
//       <div className={styles.container}>
//         <div className={styles.formContainer}>
//           <ContestForm
//             contestType={props.contestType}
//             handleSubmit={handleSubmit}
//             formRef={formRef}
//             defaultData={contestData}
//           />
//         </div>
//       </div>
//       <div className={styles.footerButtonsContainer}>
//         <div className={styles.lastContainer}>
//           <div className={styles.buttonsContainer}>
//             <BackButton />
//             <NextButton submit={submitForm} />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   const { contestCreationStore, bundleStore } = state;
//   return { contestCreationStore, bundleStore };
// };

// const mapDispatchToProps = (dispatch) => ({
//   saveContest: (data) => dispatch(saveContestToStore(data)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(ContestCreationPage);
