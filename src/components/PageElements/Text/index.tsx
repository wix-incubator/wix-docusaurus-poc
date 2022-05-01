import React from 'react';
import classnames from 'classnames';
import { useColorMode } from '@docusaurus/theme-common';
import s from './Text.module.scss';

interface TextProps {
  children: React.ReactNode;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  bold?: boolean;
}

export default function Text({
  children,
  size = 'medium',
  bold,
  ...props
}: TextProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <span
      className={classnames({
        [s.text]: true,
        [s[theme]]: true,
        [s[size]]: true,
        [s.bold]: bold,
      })}
      {...props}
    >
      {children}
    </span>
  );
}
