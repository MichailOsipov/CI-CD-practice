import { all, call, spawn } from 'redux-saga/effects';

import { dictiomariesWatcher } from './dictiomaries';
import { lkWatcher } from './lk';
import { registrationWatcher } from './registration';
import { smsConfirmationWatcher } from './smsConfirmation';
import { studentInfoSagaWatcher } from './studentInfo';
import { userWatcher } from './user';

export function* rootSaga() {
  const sagas = [
    studentInfoSagaWatcher,
    userWatcher,
    registrationWatcher,
    dictiomariesWatcher,
    smsConfirmationWatcher,
    lkWatcher,
  ];

  yield all(
    sagas.map((saga) =>
      // eslint-disable-next-line func-names
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            // TODO handle api or smth error
            console.log(e);
          }
        }
      })
    ),
  );
}
