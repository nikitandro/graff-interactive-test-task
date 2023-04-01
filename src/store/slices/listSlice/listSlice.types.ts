import { Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

export type IListState = IListItem[];

export interface IListItem {
  id: string;
  home_port?: string;
  name?: string;
  type?: string;
  launches?: string[];
  mass_kg?: number;
  year_built?: number;
}

export interface IListSliceCaseReducers extends SliceCaseReducers<IListState> {}
