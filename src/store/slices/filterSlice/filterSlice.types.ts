import { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { IListState } from '../listSlice/listSlice.types';

export interface IFiltersState {
  title: string;
  options: IListFilterOptions;
  radio: IRadioFilterOptions;
}

export interface IFilterSliceCaseReducers
  extends SliceCaseReducers<IFiltersState> {
  setTitleFilter: (
    state: IFiltersState,
    action: PayloadAction<{ title: string }>
  ) => void;
}

export type IListFilterOptions = {
  [key: string]: IListFilterOption;
};

export interface IListFilterOption {
  title: string;
  isChecked: boolean;
}

export interface IRadioFilterOptions {
  [key: string]: IRadioButtonTitle;
}

export type IRadioButtonTitle = string;
