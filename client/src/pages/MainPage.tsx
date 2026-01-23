import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';

import { Lk } from './Lk';
import { Registration } from './Registration';
import { UserStatus } from '../api/fetchUserStatus';
import { LK_URL, REGISTRATION_URL } from '../constants/urls';
import {
  getIsLoadingLogout,
  getIsLoadingUserStatus,
  getUserStatus,
  loadUserStatusAction,
  logoutUserAction,
} from '../store/user';

export const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isLoadingLogout = useSelector(getIsLoadingLogout);
  const isLoadingUserStatus = useSelector(getIsLoadingUserStatus);
  const userStatus = useSelector(getUserStatus);

  useEffect(() => {
    dispatch(loadUserStatusAction());
  }, [dispatch]);

  useEffect(() => {
    if (userStatus === UserStatus.NOT_REGISTERED) {
      history.push(REGISTRATION_URL);
    } else if (userStatus === UserStatus.REGISTERED) {
      history.push(LK_URL);
    }
  }, [userStatus, history]);

  const handleLogout = () => {
    dispatch(logoutUserAction());
  };

  return (
    <>
      <button
        type="button"
        disabled={isLoadingLogout}
        onClick={handleLogout}
      >
        Logout
      </button>
      <button type="button" onClick={() => dispatch(loadUserStatusAction())}>
        Refresh user status
      </button>
      <br />
      {isLoadingUserStatus && (
        <div>Loading user status...</div>
      )}
      {!isLoadingUserStatus && userStatus !== UserStatus.UNKNOWN && (
        <Switch>
          <Route path={REGISTRATION_URL}>
            <Registration />
          </Route>
          <Route path={LK_URL}>
            <Lk />
          </Route>
        </Switch>
      )}
    </>
  );
};
