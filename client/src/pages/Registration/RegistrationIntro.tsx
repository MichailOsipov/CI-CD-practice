import React from 'react';

type RegistrationIntroProps = {
  isLoadingStartRegistration: boolean;
  onStartRegistration: () => void;
};

export const RegistrationIntro = ({
  isLoadingStartRegistration,
  onStartRegistration
}: RegistrationIntroProps) => {
  return (
    <div>
      <h1>Registration intro</h1>
      Here is common information about SMZ
      <br />

      <button
        type="button"
        disabled={isLoadingStartRegistration}
        onClick={onStartRegistration}
      >
        Start registration
      </button>
    </div>
  );
};
