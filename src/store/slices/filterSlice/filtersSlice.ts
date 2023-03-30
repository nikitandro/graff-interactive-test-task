import { createSlice } from '@reduxjs/toolkit';
import { IFilterSliceCaseReducers, IFiltersState } from './filterSlice.types';

const filtersSlice = createSlice<IFiltersState, IFilterSliceCaseReducers>({
  name: 'filters',
  initialState: {
    title: '',
    options: {},
    radio: {},
  },
  reducers: {
    setTitleFilter(state, action): void {
      state.title = action.payload.title;
    },
  },
});
