import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Login } from './pages/Login';
import { MainPage } from './pages/MainPage';
import { getIsAuthorized, initUserSessionAction } from './store/user';
import { getIsUserSessionInitiated } from './store/user/userSelectors';

// import { RequestExample } from './pages/RequestExample';
// import { SagaExample } from './pages/SagaExample';
// import { ThunkExample } from './pages/ThunkExample';

export const App = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getIsAuthorized);

  const isUserSessionInitiated = useSelector(getIsUserSessionInitiated);

  useEffect(() => {
    dispatch(initUserSessionAction());
  }, [dispatch]);

  if (!isUserSessionInitiated) {
    return (
      <div>Preparing user session</div>
    );
  }

  if (!isAuthorized) {
    return (
      <Login />
    );
  }

  return (
    <>
      {/* <RequestExample /> */}
      {/* <ThunkExample /> */}
      {/* <SagaExample /> */}
      <MainPage />
    </>
  );
};
