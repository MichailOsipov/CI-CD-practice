import { type RootState } from '../store';

// TODO rework with reselect
export const getIsUserSessionInitiated = (state: RootState) => state.user.isUserSessionInitiated;
export const getIsAuthorized = (state: RootState) => state.user.isAuthorized;
export const getIsLoadingAuthorization = (state: RootState) => state.user.isLoadingAuthorization;
export const getIsLoadingLogout = (state: RootState) => state.user.isLoadingLogout;
export const getIsLoadingUserStatus = (state: RootState) => state.user.isLoadingUserStatus;
export const getUserStatus = (state: RootState) => state.user.userStatus;
