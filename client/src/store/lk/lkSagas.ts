import type { AxiosResponse } from 'axios';
import { call, put, takeLeading } from 'redux-saga/effects';

import { fetchLkData, type LkDataResponse } from '../../api/fetchLkData';

import { initLoadLkDataAction, loadLkDataAction, loadLkDataSuccessAction } from './lkSlice';

function* loadLkData() {
  try {
    yield put(loadLkDataAction());
    const { data: { income, taxes } }: AxiosResponse<LkDataResponse> = yield call(fetchLkData);

    yield put(loadLkDataSuccessAction({ income, taxes }));
  } catch (err) {
    // TODO handle error
  }
}

export function* lkWatcher() {
  yield takeLeading(initLoadLkDataAction, loadLkData);
}
