import React, { type ReactNode } from 'react';

import { classNames } from '../../utils/classNames';

type LayoutSectionProps = {
  children: ReactNode;
};

export const LayoutSection = ({
  children,
}: LayoutSectionProps) => {
  return (
    <div className={
      classNames(
        "p-8 sm:p-10 mb-4 last:mb-0 border-1 rounded-xl",
        'border-layout-section-border-color',
        'bg-layout-section-background'
      )}
    >
      {children}
    </div>
  );
};
