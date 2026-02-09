import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router';

import { ConfirmSmsCodeStatus } from '../../api/smsConfirmation';
import {
  REGISTRATION_COMPLETED_URL,
  REGISTRATION_INFO_URL,
  REGISTRATION_INTRO_URL,
  REGISTRATION_SMS_CONFIRMATION_URL,
} from '../../constants/urls';
import type { RootState } from '../../store';
import {
  DictionariesNames,
  getDictionaryData,
  getIsLoadingDictionary,
  initLoadDictionary,
} from '../../store/dictiomaries';
import {
  getIsLoadingCompleteRegistration,
  getIsLoadingStartRegistration,
  initCompleteRegistrationAction,
  initStartRegistrationAction,
} from '../../store/registration';
import {
  getConfirmSmsCodeStatus,
  getIsLoadingConfirmSmsCode,
  getIsLoadingSendSmsCode,
  getIsSendSmsCodeDisabled,
  getNextSendSmsCodeDateStr,
  initConfirmSmsCodeAction,
  initSendSmsCodeAction
} from '../../store/smsConfirmation';

import { RegistrationCompleted } from './RegistrationCompleted';
import { RegistrationInfo } from './RegistrationInfo';
import { RegistrationIntro } from './RegistrationIntro';
import { SmsConfirmation } from './SmsConfirmation';

export const Registration = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const isLoadingStartRegistration = useSelector(getIsLoadingStartRegistration);
  const isLoadingActivities = useSelector((state: RootState) => getIsLoadingDictionary(state, DictionariesNames.ACTIVITIES));
  const isLoadingRegions = useSelector((state: RootState) => getIsLoadingDictionary(state, DictionariesNames.REGIONS));
  const activities = useSelector((state: RootState) => getDictionaryData(state, DictionariesNames.ACTIVITIES));
  const regions = useSelector((state: RootState) => getDictionaryData(state, DictionariesNames.REGIONS));
  const isLoadingSendSmsCode = useSelector(getIsLoadingSendSmsCode);
  const nextSendSmsCodeDateStr = useSelector(getNextSendSmsCodeDateStr);
  const isSendSmsCodeDisabled = useSelector(getIsSendSmsCodeDisabled);
  const isLoadingConfirmSmsCode = useSelector(getIsLoadingConfirmSmsCode);
  const confirmSmsCodeStatus = useSelector(getConfirmSmsCodeStatus);
  const isLoadingCompleteRegistration = useSelector(getIsLoadingCompleteRegistration);

  const [selectedActivity, setSelectedActivity] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const loadActivities = useCallback(() => {
    dispatch(initLoadDictionary({ dictionaryName: DictionariesNames.ACTIVITIES }));
  }, [dispatch]);

  const loadRegions = useCallback(() => {
    dispatch(initLoadDictionary({ dictionaryName: DictionariesNames.REGIONS }));
  }, [dispatch]);

  const goToRegistrationIntro = () => history.push(REGISTRATION_INTRO_URL);
  const goToRegistrationInfo = () => history.push(REGISTRATION_INFO_URL);
  const goToRegistrationConfirmation = () => history.push(REGISTRATION_SMS_CONFIRMATION_URL);
  const goToRegistrationCompleted = () => history.push(REGISTRATION_COMPLETED_URL);

  const handleStartRegistration = () => {
    dispatch(initStartRegistrationAction({ onCompleteStartRegistration: goToRegistrationInfo }));
  };

  const handleStartSmsConfirmation = () => {
    dispatch(initSendSmsCodeAction({ onCompleteSendSmsCode: goToRegistrationConfirmation }));
  };

  const handleResentSmsCode = () => {
    dispatch(initSendSmsCodeAction({ onCompleteSendSmsCode: () => { /* do nothing */ }}));
  };

  const handleCompleteRegistration = (smsConfirmationStatus: ConfirmSmsCodeStatus) => {
    if (smsConfirmationStatus === ConfirmSmsCodeStatus.INVALID) {
      return;
    }

    dispatch(initCompleteRegistrationAction({
      activity: selectedActivity,
      region: selectedRegion,
      onCompleteRegistration: goToRegistrationCompleted,
    }));
  };

  const handleConfirmSmsCode = (smsCode: string) => new Promise<void>(resolve => {
    dispatch(initConfirmSmsCodeAction({ smsCode, onCompleteConfirmSmsCode: (status) => {
      resolve();
      handleCompleteRegistration(status);
    }}));
  });

  return (
    <Switch>
      <Route path={REGISTRATION_INTRO_URL}>
        <RegistrationIntro
          isLoadingStartRegistration={isLoadingStartRegistration}
          onStartRegistration={handleStartRegistration}
        />
      </Route>
      <Route path={REGISTRATION_INFO_URL}>
        <RegistrationInfo
          isLoadingActivities={isLoadingActivities}
          isLoadingRegions={isLoadingRegions}
          activities={activities}
          regions={regions}
          selectedActivity={selectedActivity}
          isLoadingSendSmsCode={isLoadingSendSmsCode}
          selectedRegion={selectedRegion}
          loadActivities={loadActivities}
          loadRegions={loadRegions}
          setSelectedActivity={setSelectedActivity}
          setSelectedRegion={setSelectedRegion}
          onGoBack={goToRegistrationIntro}
          onStartSmsConfirmation={handleStartSmsConfirmation}
        />
      </Route>
      <Route path={REGISTRATION_SMS_CONFIRMATION_URL}>
        <SmsConfirmation
          nextSendSmsCodeDateStr={nextSendSmsCodeDateStr}
          isLoadingSendSmsCode={isLoadingSendSmsCode}
          isSendSmsCodeDisabled={isSendSmsCodeDisabled}
          isLoadingConfirmSmsCode={isLoadingConfirmSmsCode || isLoadingCompleteRegistration}
          confirmSmsCodeStatus={confirmSmsCodeStatus}
          onGoBack={goToRegistrationInfo}
          resentSmsCode={handleResentSmsCode}
          onConfirmSmsCode={handleConfirmSmsCode}

        />
      </Route>
      <Route path={REGISTRATION_COMPLETED_URL}>
        <RegistrationCompleted />
      </Route>
    </Switch>
  );
};
