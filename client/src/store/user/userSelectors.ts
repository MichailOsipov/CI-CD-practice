import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

const getUserState = (state: RootState) => state.user;

export const getIsUserSessionInitiated = createSelector(
  getUserState,
  state => state.isUserSessionInitiated,
);
export const getIsAuthorized = createSelector(
  getUserState,
  state => state.isAuthorized,
);
export const getIsLoadingAuthorization = createSelector(
  getUserState,
  state => state.isLoadingAuthorization,
);
export const getIsLoadingLogout = createSelector(
  getUserState,
  state => state.isLoadingLogout,
);
export const getIsLoadingUserStatus = createSelector(
  getUserState,
  state => state.isLoadingUserStatus,
);
export const getUserStatus = createSelector(
  getUserState,
  state => state.userStatus,
);
