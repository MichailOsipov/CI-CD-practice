import type { AxiosResponse } from 'axios';
import { call, put, takeLeading } from 'redux-saga/effects';

import { fetchLkData, type LkDataResponse } from '../../api/fetchLkData';
import { fetchSaveCheck, type CheckValues } from '../../api/fetchSaveCheck';

import { initLoadLkDataAction, initSaveCheckAction, loadLkDataAction, loadLkDataSuccessAction, saveCheckAction, saveCheckSuccessAction } from './lkSlice';

function* loadLkData() {
  try {
    yield put(loadLkDataAction());
    const { data: { income, taxes } }: AxiosResponse<LkDataResponse> = yield call(fetchLkData);

    yield put(loadLkDataSuccessAction({ income, taxes }));
  } catch (err) {
    // TODO handle error
  }
}

function* saveCheck (action: { payload: { values: CheckValues; onCompleteSave: () => void; } }) {
  try {
    const { payload: { values, onCompleteSave } } = action;

    yield put(saveCheckAction());
    yield call(fetchSaveCheck, values);
    yield put(saveCheckSuccessAction());
    onCompleteSave();
  } catch (err) {
    // TODO handle error
  }
}

export function* lkWatcher() {
  yield takeLeading(initLoadLkDataAction, loadLkData);
  yield takeLeading(initSaveCheckAction, saveCheck);
}
