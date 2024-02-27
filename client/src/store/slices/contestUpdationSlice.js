import { createSlice } from '@reduxjs/toolkit';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';
import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';
// Определение константы для имени слайса
const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';
// Начальное состояние среза
const initialState = {
  isFetching: true,
  error: null,
};
// Создание асинхронного actions для обновления конкурса
export const updateContest = decorateAsyncThunk({
  key: CONTEST_UPDATION_SLICE_NAME,
  thunk: async (payload, { dispatch }) => {
    // Выполняем асинхронный запрос на сервер для обновление конкурса через restController
    const { data } = await restController.updateContest(payload);
    // После успешного обновления диспетчим действие для обновления состояния в другом слайсе
    dispatch(updateStoreAfterUpdateContest(data));
  },
});
// Задаем дополнительные reducers
const reducers = {
  // Очищаем состояние при необходимости
  clearContestUpdationStore: () => initialState,
};
// Задаем дополнительные reducers для обработки состояния загрузки
const extraReducers = builder => {
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
};
// Создание contestUpdationSlice с использованием createSlice из Redux Toolkit
const contestUpdationSlice = createSlice({
  name: CONTEST_UPDATION_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
// Извлечение actions и reducer из созданного слайса
const { actions, reducer } = contestUpdationSlice;
// Экспорт действий из среза
export const { clearContestUpdationStore } = actions;

export default reducer;
