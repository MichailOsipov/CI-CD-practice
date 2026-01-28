import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const getSmsConfirmationState = (state: RootState) => state.smsConfirmation;

export const getNextSendSmsCodeDateStr = createSelector(
  getSmsConfirmationState,
  state => state.nextSendSmsCodeDateStr,
);
export const getIsLoadingSendSmsCode = createSelector(
  getSmsConfirmationState,
  state => state.isLoadingSendSmsCode,
);
export const getIsSendSmsCodeDisabled = createSelector(
  getSmsConfirmationState,
  state => state.isSendSmsCodeDisabled,
);
export const getIsLoadingConfirmSmsCode = createSelector(
  getSmsConfirmationState,
  state => state.isLoadingConfirmSmsCode,
);
export const getConfirmSmsCodeStatus = createSelector(
  getSmsConfirmationState,
  state => state.confirmSmsCodeStatus,
);
