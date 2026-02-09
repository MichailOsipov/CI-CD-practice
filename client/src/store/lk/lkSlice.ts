/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { CheckValues } from '../../api/fetchSaveCheck';

export const lkSlice = createSlice({
  name: 'lk',
  initialState: {
    isLoadingLkData: false,
    income: 0,
    taxes: 0,
    isLoadingSaveCheck: false,
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
    },
    initSaveCheckAction: (state, _action: { payload: {
      values: CheckValues,
      onCompleteSave: () => void;
    } }) => state,
    saveCheckAction: (state) => {
      state.isLoadingSaveCheck = true;
    },
    saveCheckSuccessAction: (state) => {
      state.isLoadingSaveCheck = false;
    }
  },
});

export const {
  initLoadLkDataAction,
  loadLkDataAction,
  loadLkDataSuccessAction,
  initSaveCheckAction,
  saveCheckAction,
  saveCheckSuccessAction,
} = lkSlice.actions;

export const lkReducer = lkSlice.reducer;
