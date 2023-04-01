import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IListSliceCaseReducers, IListState } from './listSlice.types';
import axios from 'axios';

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

export const fetchShips = createAsyncThunk('list/fetchShips', async () => {
  const response = await axios.get('');
});

export default listSlice.reducer;
