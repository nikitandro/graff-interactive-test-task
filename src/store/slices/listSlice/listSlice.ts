import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IListSliceCaseReducers, IListState } from './listSlice.types';

const listSlice = createSlice<IListState, IListSliceCaseReducers>({
  name: 'list',
  initialState: [],
  reducers: {
    setList(state: IListState, action: PayloadAction<IListState>) {
      state = action.payload;
    },
  },
});

export const { setList } = listSlice.actions;

export default listSlice.reducer;
