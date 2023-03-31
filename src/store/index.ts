import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './slices/filterSlice/filtersSlice';
import listReducer from './slices/listSlice/listSlice';

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    shipList: listReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

export interface IRootState {}
