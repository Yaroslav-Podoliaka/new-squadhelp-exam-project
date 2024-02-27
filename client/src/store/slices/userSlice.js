import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { controller } from '../../api/ws/socketController';
import { rejectedReducer } from '../../utils/store';
import { changeEditModeOnUserProfile } from './userProfileSlice';
// Определение константы для имени слайса
const USER_SLICE_NAME = 'user';
// Начальное состояние среза
const initialState = {
  isFetching: true,
  error: null,
  data: null,
};
// Создание асинхронного actions для получения данных пользователя
export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async (replace, { rejectWithValue }) => {
    try {
      // Выполнение запроса на сервер через restController для получения данных пользователя
      const { data } = await restController.getUser();
      // Подписка на события сокета с идентификатором пользователя
      controller.subscribe(data.id);
      if (replace) {
        replace('/');
      }
      // Возврат данных пользователя для успешного завершения actions
      return data;
    } catch (err) {
      // В случае ошибки в запросе, возвращаем объект с данными об ошибке
      return rejectWithValue({
        // Если есть данные об ошибке в ответе сервера, используем их
        data: err?.response?.data ?? 'Gateway Timeout',
        // Если есть статус ошибки в ответе сервера, используем его
        status: err?.response?.status ?? 504,
      });
    }
  }
);
// Создание асинхронного action для обновления данных пользователя
export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      // Выполнение запроса на сервер для обновления данных пользователя
      const { data } = await restController.updateUser(payload);
      // Диспатч для изменения режима редактирования профиля на false
      dispatch(changeEditModeOnUserProfile(false));
      // Возврат данных пользователя после успешного обновления
      return data;
    } catch (err) {
      // В случае ошибки в запросе, возвращаем объект с данными об ошибке
      return rejectWithValue({
        // Если есть данные об ошибке в ответе сервера, используем их
        data: err?.response?.data ?? 'Gateway Timeout',
        // Если есть статус ошибки в ответе сервера, используем его
        status: err?.response?.status ?? 504,
      });
    }
  }
);
// Объект с обычными (синхронными) действиями (reducers) для очистки UserStore
const reducers = {
  clearUserStore: state => {
    state.error = null;
    state.data = null;
  },
  clearUserError: state => {
    state.error = null;
  },
};
// Объект с дополнительными (асинхронными) действиями и их обработчиками
const extraReducers = builder => {
  // Обработка начала загрузки данных пользователя
  builder.addCase(getUser.pending, state => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  // Обработка успешной загрузки данных пользователя
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  // Обработка ошибки при загрузке данных пользователя
  builder.addCase(getUser.rejected, rejectedReducer);
  // Обработка успешного обновления данных пользователя
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.data = { ...state.data, ...payload };
    state.error = null;
  });
  // Обработка ошибки при обновлении данных пользователя
  builder.addCase(updateUser.rejected, (state, { payload }) => {
    state.error = payload;
  });
};
// Создание userSlice с использованием createSlice из Redux Toolkit
const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});
// Извлечение actions и reducer из созданного userSlice
const { actions, reducer } = userSlice;
// Экспорт действий из среза
export const { clearUserStore, clearUserError } = actions;

export default reducer;
