import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Button } from '../../components/Button';
import { Typography } from '../../components/Typography';
import { LayoutPage, LayoutSection } from '../../components/layout';
import { NEW_CHECK_URL } from '../../constants/urls';
import { getIsLoadingLkData, getLkInfo, initLoadLkDataAction } from '../../store/lk';

// import styles from './Lk.css';

// import { ProviderExample } from './ProviderExample';
// import { SharedWorkerExample } from './SharedWorkerExample';
// import { WorkerExample } from './WorkerExample';

export const Lk = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoadingLkData = useSelector(getIsLoadingLkData);
  const lkInfo = useSelector(getLkInfo);

  useEffect(() => {
    dispatch(initLoadLkDataAction());
  }, [dispatch]);

  const goToNewCheck = () => history.push(NEW_CHECK_URL);

  return (
    <LayoutPage>
      <LayoutSection>
        <Typography
          className="text-center text-text-main-color"
          tag="h1"
          size="3xl"
        >
          Lk
        </Typography>
        {isLoadingLkData && (
          <Typography
            className="text-text-secondary-color"
          >
            Loading lk data...
          </Typography>
        )}
        {!isLoadingLkData && (
          <div>
            <Typography
              className="text-text-secondary-color"
              tag="span"
              size="base"
            >
              Taxes: {lkInfo.taxes}
            </Typography>
            <br />
            <Typography
              className="text-text-secondary-color"
              tag="span"
              size="base"
            >
              Income: {lkInfo.income}
            </Typography>
            <br />
          </div>
        )}
      </LayoutSection>
      {!isLoadingLkData && (
        <LayoutSection>
          <Button
            type="button"
            className="mt-2"
            onClick={goToNewCheck}
          >
            Create new check
          </Button>
        </LayoutSection>
      )}
      {/* <ProviderExample /> */}
      {/* <WorkerExample /> */}
      {/* <SharedWorkerExample /> */}
    </LayoutPage>
  );
};
