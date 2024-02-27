import { createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
} from '../../utils/store';
// Установка имени для среза состояния
const CONTEST_BY_ID_SLICE_NAME = 'getContestById';
// Начальное состояние среза состояния
const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

//---------- getContestById
export const getContestById = decorateAsyncThunk({
  // Уникальный ключ для действия
  key: `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  // Асинхронная функция-обработчик для действия
  thunk: async (payload) => {
    // Запрос данных о конкурсе с сервера
    const { data } = await restController.getContestById(payload);
    // Извлечение данных о предложениях
    const { Offers } = data;
    // Удаление данных о предложениях из основных данных о конкурсе
    delete data.Offers;
    // Возврат данных о конкурсе и предложениях
    return { contestData: data, offers: Offers };
  },
});
// Дополнительные обработчики для "getContestById"
const getContestByIdExtraReducers = createExtraReducers({
  thunk: getContestById,
  // Обработчик для случая, когда запрос еще не выполнен
  pendingReducer: state => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  },
  // Обработчик для успешного выполнения запроса
  fulfilledReducer: (state, { payload: { contestData, offers } }) => {
    state.isFetching = false;
    state.contestData = contestData;
    state.error = null;
    // Установка предложений в пустой массив, если их нет
    state.offers = offers;
  },
  // Обработчик для случая, когда запрос был отклонен (неудачен)
  rejectedReducer,
});

//---------- addOffer
export const addOffer = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  // Асинхронная функция-обработчик для "addOffer"
  thunk: async payload => {
    const { data } = await restController.setNewOffer(payload);
    return data;
  },
});
// Дополнительные обработчики для "addOffer"
const addOfferExtraReducers = createExtraReducers({
  thunk: addOffer,
  // Обработчик для успешного выполнения "addOffer"
  fulfilledReducer: (state, { payload }) => {
    state.offers.unshift(payload);
    state.error = null;
  },
  // Обработчик для отклоненного состояния "addOffer"
  rejectedReducer: (state, { payload }) => {
    state.addOfferError = payload;
  },
});

//---------- setOfferStatus
export const setOfferStatus = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  // Асинхронная функция-обработчик для "setOfferStatus"
  thunk: async payload => {
    const { data } = await restController.setOfferStatus(payload);
    return data;
  },
});
// Дополнительные обработчики для "setOfferStatus"
const setOfferStatusExtraReducers = createExtraReducers({
  thunk: setOfferStatus,
  // Обработчик для успешного выполнения "setOfferStatus"
  fulfilledReducer: (state, { payload }) => {
    state.offers.forEach(offer => {
      if (payload.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
          payload.id === offer.id
            ? CONSTANTS.OFFER_STATUS_WON
            : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (payload.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    state.error = null;
  },
  // Обработчик для отклоненного состояния "setOfferStatus"
  rejectedReducer: (state, { payload }) => {
    state.setOfferStatusError = payload;
  },
});

//---------- changeMark
export const changeMark = decorateAsyncThunk({
  key: `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  // Асинхронная функция-обработчик для "changeMark"
  thunk: async payload => {
    const { data } = await restController.changeMark(payload);
    return { data, offerId: payload.offerId, mark: payload.mark };
  },
});
// Дополнительные обработчики для "changeMark"
const changeMarkExtraReducers = createExtraReducers({
  thunk: changeMark,
  // Обработчик для успешного выполнения "changeMark"
  fulfilledReducer: (state, { payload: { data, offerId, mark } }) => {
    state.offers.forEach(offer => {
      if (offer.User.id === data.userId) {
        offer.User.rating = data.rating;
      }
      if (offer.id === offerId) {
        offer.mark = mark;
      }
    });
    state.error = null;
  },
  // Обработчик для отклоненного состояния "changeMark"
  rejectedReducer: (state, { payload }) => {
    state.changeMarkError = payload;
  },
});

//-----------------------------------------------------
// Дополнительные reducers для изменения состояния слайса
const reducers = {
  // Обновление состояния после изменения данных о конкурсе
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  // Изменение режима просмотра конкурса (Brief/Offer)
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  // Изменение флага редактирования конкурса
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  // Очистка ошибки при добавлении предложения
  clearAddOfferError: state => {
    state.addOfferError = null;
  },
  // Очистка ошибки при установке статуса предложения
  clearSetOfferStatusError: state => {
    state.setOfferStatusError = null;
  },
  // Очистка ошибки при изменении оценки
  clearChangeMarkError: state => {
    state.changeMarkError = null;
  },
  // Изменение состояния показа изображения на полный экран
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};
// Определение дополнительных обработчиков для среза состояния
const extraReducers = builder => {
  getContestByIdExtraReducers(builder);
  addOfferExtraReducers(builder);
  setOfferStatusExtraReducers(builder);
  changeMarkExtraReducers(builder);
};
// Создание среза состояния
const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
// Извлечение actions и reducer из среза состояния
const { actions, reducer } = contestByIdSlice;
// Экспорт отдельных actions
export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;
