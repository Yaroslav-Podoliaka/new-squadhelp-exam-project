import React from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import CONTANTS from '../../constants';
import {
  addOffer,
  clearAddOfferError,
} from '../../store/slices/contestByIdSlice';
import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Schems from '../../utils/validators/validationSchems';
import Error from '../Error/Error';
import styles from './OfferForm.module.sass';

const OfferForm = (props) => {
  const navigate = useNavigate();
  // Определение функции для отображения соответствующего компонента ввода в зависимости от типа конкурса
  const renderOfferInput = () => {
    if (props.contestType === CONTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name="offerData"
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }
    return (
      <FormInput
        name="offerData"
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type="text"
        label="your suggestion"
      />
    );
  };
  // Определение функции для установки предложения
  const setOffer = (values, { resetForm }) => {
    // Очистка ошибок, связанных с предыдущими попытками добавить предложение
    props.clearOfferError();
    // Создание объекта FormData для отправки данных формы
    const data = new FormData();
    // Извлечение необходимых данных из props
    const { contestId, contestType, customerId } = props;
    // Добавление необходимых данных в объект FormData
    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);
    // Вызов Redux action для добавления нового предложения
    props.setNewOffer(data);
    navigate('/dashboard');
    // Сброс формы после успешной отправки
    // resetForm();
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // Извлечение необходимых данных из props
  const { addOfferError, clearOfferError } = props;
  // Определение схемы валидации в зависимости от типа конкурса
  const validationSchema =
    props.contestType === CONTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearOfferError}
        />
      )}
      {/* Использование Formik для управления формой */}
      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        {/* Рендеринг формы */}
        <Form className={styles.form}>
          {/* Вызов функции для рендеринга компонента ввода */}
          {renderOfferInput()}
          {/* Контейнер для кнопок */}
          <div className={styles.buttonsContainer}>
            {/* Рендеринг кнопки возврата на предыдущую страницу */}
            <button
              type="button"
              onClick={handleBackClick}
              className={styles.backButton}
            >
              Back
            </button>
            {/* Рендеринг кнопки отправки формы */}
            <button type="submit" className={styles.btnOffer}>
              Send Offer
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};
// Определение функций для подключения компонента к Redux store
const mapDispatchToProps = (dispatch) => ({
  setNewOffer: (data) => dispatch(addOffer(data)),
  clearOfferError: () => dispatch(clearAddOfferError()),
});

const mapStateToProps = (state) => {
  const { addOfferError } = state.contestByIdStore;
  return {
    addOfferError,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferForm);
