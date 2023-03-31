import { PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

import { IListState } from '../listSlice/listSlice.types';
import store from '../..';

export interface IFiltersState {
  title: string;
  portOptions: IListFilterOptions;
  shipTypes: IRadioFilterOptions;
  selectedShipType: string | undefined;
}

export interface IFilterSliceCaseReducers
  extends SliceCaseReducers<IFiltersState> {
  setTitleFilter: (
    state: IFiltersState,
    action: PayloadAction<{ title: string }>
  ) => void;
  setPortOptions: (
    state: IFiltersState,
    action: PayloadAction<{ portOptions: IListFilterOptions }>
  ) => void;
  setShipTypes: (
    state: IFiltersState,
    action: PayloadAction<IRadioFilterOptions>
  ) => void;
  setSelectedShipType: (
    state: IFiltersState,
    action: PayloadAction<{ selectedShipType: string | undefined }>
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
