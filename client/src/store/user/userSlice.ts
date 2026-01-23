/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import { UserStatus } from '../../api/fetchUserStatus';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserSessionInitiated: false,
    isAuthorized: false,
    isLoadingAuthorization: false,
    isLoadingLogout: false,
    isLoadingUserStatus: false,
    userStatus: UserStatus.UNKNOWN,
  },
  reducers: {
    initUserSessionAction: (state) => state,
    initUserSessionSuccessAction: (state) => {
      state.isUserSessionInitiated = true;
      state.isAuthorized = true;
    },
    initUserSessionErrorAction: (state) => {
      state.isUserSessionInitiated = true;
    },
    loginUserAction: (state, _action: { payload: { login : string } }) => state,
    loginUserStarted: (state) => {
      state.isLoadingAuthorization = true;
    },
    loginUserSuccess: (state) => {
      state.isLoadingAuthorization = false;
      state.isAuthorized = true;
    },
    logoutUserAction: (state) => state,
    logoutUserStarted: (state) => {
      state.isLoadingLogout = true;
    },
    logoutUserSuccess: (state) => {
      state.isLoadingLogout = false;
      state.isAuthorized = false;
    },
    loadUserStatusAction: (state) => state,
    loadUserStatusStarted: (state) => {
      state.isLoadingUserStatus = true;
    },
    loadUserStatusSuccess: (state, action: { payload: { status: UserStatus }}) => {
      state.isLoadingUserStatus = false;
      state.userStatus = action.payload.status;
    },
    loadUserStatusError: (state) => {
      state.isLoadingUserStatus = false;
    }
  },
});

export const {
  initUserSessionAction,
  initUserSessionSuccessAction,
  initUserSessionErrorAction,
  loginUserAction,
  loginUserStarted,
  loginUserSuccess,
  logoutUserAction,
  logoutUserStarted,
  logoutUserSuccess,
  loadUserStatusAction,
  loadUserStatusStarted,
  loadUserStatusSuccess,
  loadUserStatusError,
} = userSlice.actions;

export const userReducer = userSlice.reducer;