import { createSlice } from '@reduxjs/toolkit';

export type StudentState = {
  data: {
    name: string;
  };
  message: string;
};

export const studentInfoSlice = createSlice({
  name: 'student',
  initialState: {
    data: { name: '' },
    message: '',
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    loadStudentInfoInit: (state, _action: { payload: { studentId: string } }) => state,
    loadStudentInfoSucceeded: (state, action) => {
      return {
        ...state,
        data: action.payload.student,
      };
    },
    loadStudentInfoFailed: (state, action) => {
      return {
        ...state,
        message: action.payload.message,
      };
    },
  },
});

export const { loadStudentInfoInit, loadStudentInfoSucceeded, loadStudentInfoFailed } = studentInfoSlice.actions;
export const studentInfoReducer = studentInfoSlice.reducer;
