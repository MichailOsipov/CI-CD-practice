import React, { type ReactNode } from 'react';

type LayoutPageProps = {
  children: ReactNode;
};

export const LayoutPage = ({ children }: LayoutPageProps) => {
  return (
    <div className="mt-0 mb-0 ml-auto mr-auto max-w-200 p-2 bg-page-background">
      {children}
    </div>
  );
};
