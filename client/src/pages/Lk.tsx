import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getIsLoadingLkData, getLkInfo, initLoadLkDataAction } from '../store/lk';

export const Lk = () => {
  const dispatch = useDispatch();

  const isLoadingLkData = useSelector(getIsLoadingLkData);
  const lkInfo = useSelector(getLkInfo);

  useEffect(() => {
    dispatch(initLoadLkDataAction());
  }, [dispatch]);

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
    </div>
  );
};
