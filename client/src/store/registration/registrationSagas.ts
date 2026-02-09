import type { AxiosResponse } from 'axios';
import { call, put, select, takeLeading } from 'redux-saga/effects';

import { fetchClientFind, type ClientFindResponse } from '../../api/fetchClientFind';
import { fetchClientInfo, type ClientInfoResponse } from '../../api/fetchClientInfo';
import { fetchClientRegister } from '../../api/fetchClientRegister';
import { fetchClientVerification, type ClientVerificationResponse } from '../../api/fetchClientVerification';

import { getRegistrationInn } from './registrationSelectors';
import {
  completeRegistrationAction,
  completeRegistrationSuccessAction,
  initCompleteRegistrationAction,
  initStartRegistrationAction,
  startRegistrationAction,
  startRegistrationCompleteAction,
} from './registrationSlice';

function* startRegistration(action: { payload: { onCompleteStartRegistration: () => void; } }) {
  try {
    yield put(startRegistrationAction());
  
    const { data: { phoneNumber } }: AxiosResponse<ClientInfoResponse> = yield call(fetchClientInfo);
    const { data: { inn } }: AxiosResponse<ClientFindResponse> = yield call(fetchClientFind);
    const { data: { verificationStatus } }: AxiosResponse<ClientVerificationResponse> = yield call(fetchClientVerification);
  
    yield put(startRegistrationCompleteAction({ phoneNumber, inn, verificationStatus }));

    yield call(action.payload.onCompleteStartRegistration);
  } catch (err) {
    // TODO handle error
  }
}

function* completeRegistration(action: { payload: {
  activity: string;
  region: string;
  onCompleteRegistration: () => void;
}}) {
  try {
    yield put(completeRegistrationAction());
    const { payload: { activity, region, onCompleteRegistration } } = action;

    const inn: string = yield select(getRegistrationInn);
  
    yield call(fetchClientRegister, activity, region, inn);

    yield put(completeRegistrationSuccessAction());

    onCompleteRegistration();
  } catch (err) {
    // TODO handle error
  }
}

export function* registrationWatcher() {
  yield takeLeading(initStartRegistrationAction, startRegistration);
  yield takeLeading(initCompleteRegistrationAction, completeRegistration);
}
