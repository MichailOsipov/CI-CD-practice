/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

import type { Activity, Region } from '../../api/dictionaries';

import { DictionariesNames } from './constants';

export type DictionaryInfo<T> = {
  isLoading: boolean;
  isLoaded: boolean;
  data: T[];
};

export type DictionariesState = {
  [DictionariesNames.ACTIVITIES]: DictionaryInfo<Activity>;
  [DictionariesNames.REGIONS]: DictionaryInfo<Region>;
};

const INITIAL_STATE: DictionariesState = {
  [DictionariesNames.ACTIVITIES]: {
    isLoading: false,
    isLoaded: false,
    data: [],
  },
  [DictionariesNames.REGIONS]: {
    isLoading: false,
    isLoaded: false,
    data: [],
  }
};

type SetDictinaryPayload = {
  dictionaryName: DictionariesNames.ACTIVITIES;
  data: Activity[];
} | {
  dictionaryName: DictionariesNames.REGIONS;
  data: Region[];
};

export const dictionariesSlice = createSlice({
  name: 'dictionaries',
  initialState: INITIAL_STATE,
  reducers: {
    initLoadDictionary: (state, _action: { payload: { dictionaryName: DictionariesNames } }) => state,
    loadDictionaryAction: (state, action: { payload: { dictionaryName: DictionariesNames }}) => {
      state[action.payload.dictionaryName].isLoading = true;
    },
    loadDictionarySuccessAction: (state, action: { payload: SetDictinaryPayload; }) => {
      state[action.payload.dictionaryName].isLoaded = true;
      state[action.payload.dictionaryName].isLoading = false;
      state[action.payload.dictionaryName].data = action.payload.data;
    },
  },
});

export const {
  initLoadDictionary,
  loadDictionaryAction,
  loadDictionarySuccessAction,
} = dictionariesSlice.actions;

export const dictionariesReducer = dictionariesSlice.reducer;
