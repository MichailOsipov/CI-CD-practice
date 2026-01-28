/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { VerificationStatus } from '../../api/fetchClientVerification';

type RegistrationState = {
  isLoadingStartRegistration: boolean;
  phoneNumber: string;
  inn: string;
  verificationStatus: VerificationStatus;
  isLoadingCompleteRegistration: boolean;
};

const INITIAL_STATE: RegistrationState = {
  isLoadingStartRegistration: false,
  phoneNumber: '',
  inn: '',
  verificationStatus: 'UNKNOWN',
  isLoadingCompleteRegistration: false,
};

export const registrationSlice = createSlice({
  name: 'registration',
  initialState: INITIAL_STATE,
  reducers: {
    initStartRegistrationAction: (state, _action: {
      payload: { onCompleteStartRegistration: () => void; };
    }) => state,
    startRegistrationAction: (state) => {
      state.isLoadingStartRegistration = true;
    },
    startRegistrationCompleteAction: (state, action: {
      payload: {
        phoneNumber: string;
        inn: string;
        verificationStatus: VerificationStatus;
      }}) => {
      state.isLoadingStartRegistration = false;
      state.phoneNumber = action.payload.phoneNumber;
      state.verificationStatus = action.payload.verificationStatus;
      state.inn = action.payload.inn;
    },
    initCompleteRegistrationAction: (state, _action:
      { payload: {
        activity: string;
        region: string;
        onCompleteRegistration: () => void;
      }}) => state,
    completeRegistrationAction: (state) => {
      state.isLoadingCompleteRegistration = true;
    },
    completeRegistrationSuccessAction: (state) => {
      state.isLoadingCompleteRegistration = false;
    }
  },
});

export const {
  initStartRegistrationAction,
  startRegistrationAction,
  startRegistrationCompleteAction,
  initCompleteRegistrationAction,
  completeRegistrationAction,
  completeRegistrationSuccessAction,
} = registrationSlice.actions;

export const registrationReducer = registrationSlice.reducer;
