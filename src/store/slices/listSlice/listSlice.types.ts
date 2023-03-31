import { Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';

export type IListState = IListItem[];

export interface IListItem {
  id: string;
  portName?: string;
  shipName?: string;
  typeName?: string;
  shipType?: string;
  launches?: string[];
  massKg?: number;
  yearBuild?: number;
}

export interface IListSliceCaseReducers extends SliceCaseReducers<IListState> {}
