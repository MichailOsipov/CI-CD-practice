import React, { useCallback, useEffect, useState, type ReactNode } from 'react';

type OfflineProps = {
  children: ReactNode;
};

export const Offline = ({ children }: OfflineProps) => {
  console.log(navigator.onLine);
  // Not secure - should use some request to try
  const [isOnline, setIsOnline] = useState<boolean | undefined>(navigator.onLine);

  const handleSetOnline = useCallback(() => setIsOnline(true), []);
  const handleSetOffline = useCallback(() => setIsOnline(false), []);

  useEffect(() => {
    // console.log('hi there !');
    window.addEventListener('online', handleSetOnline);
    window.addEventListener('offline', handleSetOffline);

    return () => {
      window.removeEventListener('online', handleSetOnline);
      window.removeEventListener('offline', handleSetOffline);
    };
  }, [handleSetOnline, handleSetOffline]);

  return (
    <div>
      {!isOnline && <div>It seems like you`re offline</div>}
      {children}
    </div>
  );
};