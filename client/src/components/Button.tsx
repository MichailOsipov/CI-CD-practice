import React, { type ReactNode } from 'react';

import { classNames } from '../utils/classNames';

type ButtonProps = {
  className?: string;
  type?: 'submit' | 'button';
  disabled?: boolean;
  children: ReactNode;
  onClick?: () => void;
};

export const Button = ({
  className,
  type = 'button',
  disabled,
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={classNames(
        'rounded-md',
        'pt-2', 'pb-2', 'pl-4', 'pr-4',
        'text-button-primary-text-color',
        'bg-button-primary-background',
        'hover:bg-button-primary-hover-background',
        'disabled:bg-sky-200',
        'disabled:text-sky-400',
        'cursor-pointer',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
