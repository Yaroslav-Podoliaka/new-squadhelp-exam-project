import { createSlice } from '@reduxjs/toolkit';
// Определение константы для имени слайса
const CONTEST_SAVING_SLICE_NAME = 'contestCreation';
// Начальное состояние среза
const initialState = {
  // Объект для хранения данных о конкурсах
  contests: {},
};
// Задаем reducers для обработки действий
const reducers = {
  // Reducers для сохранения информации о конкурсе в состояние
  saveContestToStore: (state, { payload: { type, info } }) => {
    state.contests = {
      ...state.contests,
      // Обновляем данные по конкретному типу конкурса
      ...{ [type]: info },
    };
  },
  // Reducers для очистки состояния и возвращения к начальным данным
  clearContestStore: () => initialState,
};
// Создаем срез состояния с использованием createSlice
const contestSavingSlice = createSlice({
  name: CONTEST_SAVING_SLICE_NAME,
  initialState,
  reducers,
});
// Извлечение actions и reducer из созданного слайса
const { actions, reducer } = contestSavingSlice;
// Экспорт действий из среза
export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
