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

export type IFilterOptions = {
  [key: string]: IFilterOption;
};

export interface IFilterOption {
  title: string;
  isChecked: boolean;
}

export interface IRadioButtonValues {
  [key: string]: IRadioButtonTitle;
}

export type IRadioButtonTitle = string;
