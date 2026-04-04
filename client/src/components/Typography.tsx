import React, { type ReactNode } from 'react';

import { classNames } from '../utils/classNames';

import './Typography.css';

type TypographyProps = {
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'span';
  size?: 'xsmall' | 'small' | 'base' | 'large' | '3xl';
  children: ReactNode;
};

export const Typography = ({
  className,
  tag = 'span',
  size = 'base',
  children,
}: TypographyProps) => {
  const Tag = tag;

  return (
    <Tag className={classNames(`typography-text-${size}`, className)}>
      {children}
    </Tag>
  );
};
