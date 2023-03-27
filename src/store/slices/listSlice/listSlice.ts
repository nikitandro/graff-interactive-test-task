import { createSlice } from '@reduxjs/toolkit';
import { IListState } from './listSlice.types';

const listSlice = createSlice<IListState, {}>({
  name: 'list',
  initialState: [],
  reducers: {},
});
