import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  IFilterSliceCaseReducers,
  IFiltersState,
  IListFilterOptions,
  IRadioFilterOptions,
} from './filterSlice.types';

const initialState: IFiltersState = {
  title: '',
  portOptions: {},
  shipTypes: {},
  selectedShipType: undefined,
};

const filtersSlice = createSlice<IFiltersState, IFilterSliceCaseReducers>({
  name: 'filters',
  initialState,
  reducers: {
    setTitleFilter(
      state: IFiltersState,
      action: PayloadAction<{ title: string }>
    ) {
      state.title = action.payload.title;
    },
    setPortOptions(
      state: IFiltersState,
      action: PayloadAction<{ portOptions: IListFilterOptions }>
    ) {
      state.portOptions = { ...action.payload.portOptions };
    },
    setShipTypes(
      state: IFiltersState,
      action: PayloadAction<IRadioFilterOptions>
    ) {
      state.shipTypes = { ...action.payload };
    },
    setSelectedShipType(
      state: IFiltersState,
      action: PayloadAction<{ selectedShipType: string | undefined }>
    ) {
      state.selectedShipType = action.payload.selectedShipType;
    },
  },
});

export const {
  setTitleFilter,
  setPortOptions,
  setShipTypes,
  setSelectedShipType,
} = filtersSlice.actions;

export default filtersSlice.reducer;
