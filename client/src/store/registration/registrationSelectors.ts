import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const getRegistrationState = (state: RootState) => state.registration;

export const getIsLoadingStartRegistration = createSelector(
  getRegistrationState,
  state => state.isLoadingStartRegistration,
);

export const getIsLoadingCompleteRegistration = createSelector(
  getRegistrationState,
  state => state.isLoadingCompleteRegistration,
);

export const getRegistrationInn = createSelector(
  getRegistrationState,
  state => state.inn,
);
