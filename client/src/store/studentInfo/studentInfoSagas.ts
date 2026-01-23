import { call, put, takeEvery } from 'redux-saga/effects';

import { loadStudentInfoFailed, loadStudentInfoInit, loadStudentInfoSucceeded } from './studentInfoSlice';

type Student = {
  name: string;
};

type FetchStudent = (studentId: string) => Promise<Student>;

const uploadStudent = (studentId: string) => fetch(`/api/student/${studentId}`)
  .then(response => response.json())
  .then(data => data.student);

function* fetchStudentInfo (action: { type: string; payload: { studentId: string }}) {
  try {
    const student: FetchStudent = yield call(uploadStudent, action.payload.studentId);
    yield put(loadStudentInfoSucceeded({ student }));
  } catch (err) {
    yield put(loadStudentInfoFailed({ message: err.message }));
  }
}

export function* studentInfoSagaWatcher () {
  yield takeEvery(loadStudentInfoInit, fetchStudentInfo);
}
