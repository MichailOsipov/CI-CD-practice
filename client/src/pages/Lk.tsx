import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { NEW_CHECK_URL } from '../constants/urls';
import { getIsLoadingLkData, getLkInfo, initLoadLkDataAction } from '../store/lk';

import { ProviderExample } from './ProviderExample';

export const Lk = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoadingLkData = useSelector(getIsLoadingLkData);
  const lkInfo = useSelector(getLkInfo);

  useEffect(() => {
    dispatch(initLoadLkDataAction());
  }, [dispatch]);

  const goToNewCheck = () => history.push(NEW_CHECK_URL);

  if (isLoadingLkData) {
    return (
      <div>Loading lk data</div>
    );
  }

  return (
    <div>
      <h1>Lk</h1>
      Taxes: {lkInfo.taxes}
      <br />
      Income: {lkInfo.income}
      <br />
      <button type="button" onClick={goToNewCheck}>Create new check</button>
      <ProviderExample />
    </div>
  );
};
