import React, { useEffect, useState } from 'react';

type TimestampProps = {
  nextSendSmsCodeDateStr: string;
};

export const Timestamp = ({
  nextSendSmsCodeDateStr,
}: TimestampProps) => {
  const [leftSeconds, setLeftSeconds] = useState(0);

  useEffect(() => {
    let continueUpdateLeftSeconds = true;
    const nextSendSmsCodeDate = new Date(nextSendSmsCodeDateStr);

    if (nextSendSmsCodeDate < new Date()) {
      setLeftSeconds(0);

      return;
    }

    const updateLeftSeconds = () => {
      requestAnimationFrame(() => {
        const currDate = new Date();

        if (!continueUpdateLeftSeconds || nextSendSmsCodeDate < currDate) {
          return;
        }

        const newSeconds = (nextSendSmsCodeDate.getTime() - currDate.getTime()) / 1000;

        setLeftSeconds(newSeconds);

        updateLeftSeconds();
      });
    };

    updateLeftSeconds();

    return () => {
      continueUpdateLeftSeconds = false;
    };

  }, [nextSendSmsCodeDateStr]);

  return (
    <div>You can request your code in: {leftSeconds} seconds</div>
  );
};