import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

import { type DictionariesNames } from './constants';
import type { DictionariesState } from './dictionariesSlice';

const getDictionariesState = (state: RootState) => state.dictionaries;

const getDictionaryStateByName = createSelector(
  getDictionariesState,
  (state: RootState, dictionaryName: DictionariesNames) => dictionaryName,
  <T extends DictionariesNames>(state: DictionariesState, dictionaryName: T): DictionariesState[T] => {
    return state[dictionaryName];
  }
);

export const getIsLoadingDictionary = createSelector(
  getDictionaryStateByName,
  dictionary => dictionary.isLoading,
);

export const getIsLoadedDictionary = createSelector(
  getDictionaryStateByName,
  dictionary => dictionary.isLoaded,
);

type GetDictionaryDataSelector = <T extends DictionariesNames>(
  state: RootState,
  dictionaryName: T,
) => DictionariesState[T]['data'];

export const getDictionaryData: GetDictionaryDataSelector = createSelector(
  getDictionaryStateByName,
  (dictionary) => dictionary.data,
);
