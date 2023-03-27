import { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { IListState } from '../listSlice/listSlice.types';

export interface IFiltersState {
  title: string;
  options: IFilterOptions;
  radio: IRadioButtonValues;
}

export interface IFilterSliceCaseReducers
  extends SliceCaseReducers<IFiltersState> {
  setTitleFilter: (
    state: IFiltersState,
    action: PayloadAction<{ title: string }>
  ) => void;
}

export interface IFilterOptions {
  [key: string]: boolean;
}

export type IRadioButtonValues = 'test1' | 'test2' | '';
