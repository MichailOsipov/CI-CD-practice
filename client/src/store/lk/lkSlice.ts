/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const lkSlice = createSlice({
  name: 'lk',
  initialState: {
    isLoadingLkData: false,
    income: 0,
    taxes: 0,
  },
  reducers: {
    initLoadLkDataAction: (state) => state,
    loadLkDataAction: (state) => {
      state.isLoadingLkData = true;
    },
    loadLkDataSuccessAction: (state, action: { payload: { income: number; taxes: number; }}) => {
      state.isLoadingLkData = false;
      state.income = action.payload.income;
      state.taxes = action.payload.taxes;
    }
  },
});

export const {
  initLoadLkDataAction,
  loadLkDataAction,
  loadLkDataSuccessAction,
} = lkSlice.actions;

export const lkReducer = lkSlice.reducer;
