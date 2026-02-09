import type { AxiosResponse } from 'axios';
import { call, delay, put, select, takeEvery, takeLeading } from 'redux-saga/effects';

import { fetchConfirmSmsCode, fetchSendSmsCode, type ConfirmSmsCodeResponse, type ConfirmSmsCodeStatus, type SendSmsCodeResponse } from '../../api/smsConfirmation';

import { getNextSendSmsCodeDateStr } from './smsConfirmationSelectors';
import {
  confirmSmsCodeAction,
  confirmSmsCodeSuccessAction,
  initConfirmSmsCodeAction,
  initSendSmsCodeAction,
  sendSmsCodeAction,
  sendSmsCodeSuccessAction,
  sendSmsCodeUnlockAction,
} from './smsConfirmationSlice';

function* sendSmsCode(action: { payload: { onCompleteSendSmsCode: () => void; } }) {
  const { payload: { onCompleteSendSmsCode }} = action;
  try {
    const currNextSendSmsCodeDateStr: string = yield select(getNextSendSmsCodeDateStr);
    if (new Date(currNextSendSmsCodeDateStr) > new Date()) {
      onCompleteSendSmsCode();
      return;
    }

    yield put(sendSmsCodeAction());
  
    const { data: { nextRequestTimeInSeconds }}: AxiosResponse<SendSmsCodeResponse> = yield call(fetchSendSmsCode);
    
    const nextSendSmsCodeDate = new Date();
    nextSendSmsCodeDate.setSeconds(nextSendSmsCodeDate.getSeconds() + nextRequestTimeInSeconds);
    const nextSendSmsCodeDateStr = nextSendSmsCodeDate.toString();

    yield put(sendSmsCodeSuccessAction({ nextSendSmsCodeDateStr }));
    
    yield call(onCompleteSendSmsCode);

    yield delay(1000 * nextRequestTimeInSeconds);
    yield put(sendSmsCodeUnlockAction());
  } catch (err) {
    // TODO handle errors
  }
}

function* confirmSmsCode(action: { payload: {
  smsCode: string;
  onCompleteConfirmSmsCode: (status: ConfirmSmsCodeStatus) => void;
} }) {
  try {
    const { payload: { smsCode } } = action;
    yield put(confirmSmsCodeAction());
  
    const { data: { confirmSmsCodeStatus } }: AxiosResponse<ConfirmSmsCodeResponse> = yield call(fetchConfirmSmsCode, smsCode);
    yield put(confirmSmsCodeSuccessAction({ confirmSmsCodeStatus }));
    action.payload.onCompleteConfirmSmsCode(confirmSmsCodeStatus);
  } catch (err) {
    // TODO handle errors
  }
}

export function* smsConfirmationWatcher() {
  yield takeEvery(initSendSmsCodeAction, sendSmsCode);
  yield takeLeading(initConfirmSmsCodeAction, confirmSmsCode);
}
