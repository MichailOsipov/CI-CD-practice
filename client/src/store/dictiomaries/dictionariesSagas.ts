import type { AxiosResponse } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';

import { fetchActivities, fetchRegions, type Activity, type Region } from '../../api/dictionaries';

import { DictionariesNames } from './constants';
import { getIsLoadedDictionary } from './dictionariesSelectors';
import { initLoadDictionary, loadDictionaryAction, loadDictionarySuccessAction } from './dictionariesSlice';

function* loadDictionary(action: { payload: { dictionaryName: DictionariesNames }}) {
  const { payload: { dictionaryName }} = action;

  const isLoaded: boolean = yield select(state => getIsLoadedDictionary(state, dictionaryName));

  if (isLoaded) {
    return;
  }

  try {
    yield put(loadDictionaryAction({ dictionaryName }));
  
    if (dictionaryName  === DictionariesNames.ACTIVITIES) {
      const { data: { items } }: AxiosResponse<{ items: Activity[] }> = yield call(fetchActivities);
      yield put(loadDictionarySuccessAction({ dictionaryName, data: items }));
    } else if (dictionaryName) {
      const { data: { items } }: AxiosResponse<{ items: Region[] }> = yield call(fetchRegions);
      yield put(loadDictionarySuccessAction({ dictionaryName, data: items }));
    }
  } catch (err) {
    // TODO handle error
  }

}

export function* dictiomariesWatcher() {
  yield takeEvery(initLoadDictionary, loadDictionary);
}
