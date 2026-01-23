import { all, call, spawn } from 'redux-saga/effects';

import { studentInfoSagaWatcher } from './studentInfo';
import { userWatcher } from './user';

export function* rootSaga() {
  const sagas = [
    studentInfoSagaWatcher,
    userWatcher,
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
