import { type AxiosResponse } from 'axios';
import { channel } from 'redux-saga';
import { call, put, race, take, takeLeading } from 'redux-saga/effects';

import {
  initUserSessionAction,
  initUserSessionErrorAction,
  initUserSessionSuccessAction,
  loadUserStatusAction,
  loadUserStatusError,
  loadUserStatusStarted,
  loadUserStatusSuccess,
  loginUserAction,
  loginUserStarted,
  loginUserSuccess,
  logoutUserAction,
  logoutUserStarted,
  logoutUserSuccess,
} from './userSlice';
import { fetchUserStatus, type UserStatusResponse } from '../../api/fetchUserStatus';
import { authservice } from '../../services/authService';

function* initUserSession () {
  try {
    const tokenChannel = channel();

    yield call(authservice.init.bind(authservice), () => {
      tokenChannel.put('error-token');
    });
    yield put(initUserSessionSuccessAction());

    while (true) {
      const { logout, tokenError } = yield race({
        tokenError: take(tokenChannel),
        logout: take(logoutUserAction),
      });

      if (logout) {
        tokenChannel.close();
        break;
      } else if (tokenError) {
        yield put(logoutUserAction());
        tokenChannel.close();

        break;
      }
    }
  } catch (err) {
    yield put(initUserSessionErrorAction());
  }
}

function* loginUser(action: { type: string; payload: { login: string }}) {
  try {
    const { login } = action.payload;
  
    yield put(loginUserStarted());

    const tokenChannel = channel();
  
    yield call(authservice.login.bind(authservice), login, () => {
      tokenChannel.put('error-token');
    });
  
    yield put(loginUserSuccess());

    while (true) {
      const { logout, tokenError } = yield race({
        tokenError: take(tokenChannel),
        logout: take(logoutUserAction),
      });

      if (logout) {
        tokenChannel.close();
        break;
      } else if (tokenError) {
        yield put(logoutUserAction());
        tokenChannel.close();

        break;
      }
    }
  } catch (error) {
    // TODO handle error
  }
}

function* logoutUser() {
  try {
    yield put(logoutUserStarted());
    yield call(authservice.logout.bind(authservice));
    yield put(logoutUserSuccess());
    yield put(logoutUserSuccess());
  } catch (error) {
    // TODO handle error
  }
}

function* loadUserStatus() {
  try {
    yield put(loadUserStatusStarted());

    const { data: statusResponse }: AxiosResponse<UserStatusResponse> = yield call(fetchUserStatus);

    yield put(loadUserStatusSuccess({ status: statusResponse.status }));
  } catch (e) {
    yield put(loadUserStatusError());
    // TODO handle error
  }
}

export function* userWatcher() {
  yield takeLeading(initUserSessionAction, initUserSession);
  yield takeLeading(loginUserAction, loginUser);
  yield takeLeading(logoutUserAction, logoutUser);
  yield takeLeading(loadUserStatusAction, loadUserStatus);
}
