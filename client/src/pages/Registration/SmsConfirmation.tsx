import React, { useState } from 'react';

import { ConfirmSmsCodeStatus } from '../../api/smsConfirmation';

import { Timestamp } from './Timestamp';

const SMS_CODE_LENGTH = 6;

type SmsConfirmationProps = {
  nextSendSmsCodeDateStr: string;
  isLoadingSendSmsCode: boolean;
  isSendSmsCodeDisabled: boolean;
  isLoadingConfirmSmsCode: boolean;
  confirmSmsCodeStatus?: ConfirmSmsCodeStatus;
  onGoBack: () => void;
  resentSmsCode: () => void;
  onConfirmSmsCode: (smsCode: string) => Promise<void>;
};

export const SmsConfirmation = ({
  nextSendSmsCodeDateStr,
  isLoadingSendSmsCode,
  isSendSmsCodeDisabled,
  isLoadingConfirmSmsCode,
  confirmSmsCodeStatus,
  onGoBack,
  resentSmsCode,
  onConfirmSmsCode,
}: SmsConfirmationProps) => {
  const [smsCode, setSmsCode] = useState('');

  const handleChangeSmsCode = (newSmsCode: string) => {
    setSmsCode(newSmsCode);

    if (newSmsCode.length === SMS_CODE_LENGTH) {
      onConfirmSmsCode(newSmsCode).then(() => {
        setSmsCode('');
      });
    }
  };

  return (
    <div>
      <h1>SmsConfirmation</h1>

      <button type="button" onClick={onGoBack}>
        On go back
      </button>
      <br />
      <label htmlFor="sms-code">
        Sms code:
        <input
          id="sms-code"
          maxLength={SMS_CODE_LENGTH}
          type="text"
          value={smsCode}
          disabled={isLoadingConfirmSmsCode}
          onChange={e => handleChangeSmsCode(e.target.value)}
        />
        {confirmSmsCodeStatus === ConfirmSmsCodeStatus.INVALID && (
          <div>Invalid sms code</div>
        )}
      </label>

      {isSendSmsCodeDisabled ? (
        <Timestamp
          nextSendSmsCodeDateStr={nextSendSmsCodeDateStr}
        />
      ) : (
        <button
          type="button"
          disabled={isLoadingSendSmsCode}
          onClick={resentSmsCode}
        >
          Request sms code again
        </button>
      )}
    </div>
  );
};