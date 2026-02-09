/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import type { ConfirmSmsCodeStatus } from '../../api/smsConfirmation';

type SmsConfirmationState = {
  isLoadingSendSmsCode: boolean;
  isSendSmsCodeDisabled: boolean;
  nextSendSmsCodeDateStr: string;
  isLoadingConfirmSmsCode: boolean;
  confirmSmsCodeStatus?: ConfirmSmsCodeStatus;
};

const INITIAL_STATE: SmsConfirmationState = {
  isLoadingSendSmsCode: false,
  isSendSmsCodeDisabled: false,
  nextSendSmsCodeDateStr: new Date().toString(),
  isLoadingConfirmSmsCode: false,
  confirmSmsCodeStatus: undefined
};

export const smsConfirmationSlice = createSlice({
  name: 'smsConfirmation',
  initialState: INITIAL_STATE,
  reducers: {
    initSendSmsCodeAction: (state, _action: { payload: { onCompleteSendSmsCode: () => void; } }) => state,
    sendSmsCodeAction: (state) => {
      state.isLoadingSendSmsCode = true;
    },
    sendSmsCodeSuccessAction: (state, action: { payload: { nextSendSmsCodeDateStr: string; } }) => {
      state.isLoadingSendSmsCode = false;
      state.isSendSmsCodeDisabled = true;
      state.nextSendSmsCodeDateStr = action.payload.nextSendSmsCodeDateStr;
    },
    sendSmsCodeUnlockAction: (state) => {
      state.isSendSmsCodeDisabled = false;
    },
    initConfirmSmsCodeAction: (state, _action: {
      payload: {
        smsCode: string;
        onCompleteConfirmSmsCode: (status: ConfirmSmsCodeStatus) => void;
      };
    }) => state,
    confirmSmsCodeAction: (state) => {
      state.isLoadingConfirmSmsCode = true;
      state.confirmSmsCodeStatus = undefined;
    },
    confirmSmsCodeSuccessAction: (state, action: { payload: { confirmSmsCodeStatus: ConfirmSmsCodeStatus }}) => {
      state.isLoadingConfirmSmsCode = false;
      state.confirmSmsCodeStatus = action.payload.confirmSmsCodeStatus;
    },
  },
});

export const { 
  initSendSmsCodeAction,
  sendSmsCodeAction,
  sendSmsCodeSuccessAction,
  sendSmsCodeUnlockAction,
  initConfirmSmsCodeAction,
  confirmSmsCodeAction,
  confirmSmsCodeSuccessAction,
} = smsConfirmationSlice.actions;

export const smsConfirmationReducer = smsConfirmationSlice.reducer;
