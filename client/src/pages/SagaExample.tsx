import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type RootState } from '../store';
import { loadStudentInfoInit, type StudentState } from '../store/studentInfo';

export const SagaExample = () => {
  const userData = useSelector<RootState, StudentState>(state => state.studentInfo);
  const dispatch = useDispatch();

  const loadUser = () => {
    dispatch(loadStudentInfoInit({ studentId: 'Andrey' }));
  };

  return (
    <div>
      SagaExample
      user: {userData.data.name}<br />
      error message: {userData.message || '---'}<br />
      <button
        type="button"
        onClick={loadUser}
      >
        Call fetch user
      </button>
    </div>
  );
};
