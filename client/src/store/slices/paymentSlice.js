import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { clearContestStore } from './contestCreationSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';
import CONSTANTS from '../../constants';
import {
  decorateAsyncThunk,
  pendingReducer,
  rejectedReducer,
} from '../../utils/store';
// Уникальное имя slice для Redux
const PAYMENT_SLICE_NAME = 'payment';
// Начальное состояние slice
const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};
// Создаем асинхронный thunk для оплаты
export const pay = decorateAsyncThunk({
  key: `${PAYMENT_SLICE_NAME}/pay`,
  thunk: async ({ data, navigate }, { dispatch }) => {
    // Вызываем API для проведения платежа
    await restController.payMent(data);
    // Переходим на страницу dashboard
    navigate('/dashboard');
    // Очищаем хранилище конкурсов
    dispatch(clearContestStore());
  },
});
// Создаем асинхронный thunk для вывода средств
export const cashOut = decorateAsyncThunk({
  key: `${PAYMENT_SLICE_NAME}/cashOut`,
  thunk: async (payload, { dispatch }) => {
    // Вызываем API для вывода средств
    const { data } = await restController.cashOut(payload);
    // Обновляем данные пользователя после вывода средств
    dispatch(updateUser.fulfilled(data));
    // Меняем режим просмотра профиля пользователя
    dispatch(changeProfileViewMode(CONSTANTS.USER_INFO_MODE));
  },
});
/// Объявляем reducers для изменения состояния slice
const reducers = {
  // Изменяем фокус на элементе карты
  changeFocusOnCard: (state, { payload }) => {
    state.focusOnElement = payload;
  },
  // Очищаем хранилище платежей
  clearPaymentStore: () => initialState,
};
// Объявляем дополнительные reducers для обработки состояний pending, fulfilled и rejected
const extraReducers = builder => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};
// Создаем slice для управления состоянием платежей
const paymentSlice = createSlice({
  name: PAYMENT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
// Экспортируем actions и reducer из slice
const { actions, reducer } = paymentSlice;
// Экспортируем необходимые actions для использования в компонентах
export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
