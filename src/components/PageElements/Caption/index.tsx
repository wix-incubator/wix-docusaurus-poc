import React from 'react';
import classnames from 'classnames';
import s from './Caption.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

export type CaptionColor =
  | 'yellow'
  | 'red'
  | 'turquoise'
  | 'green'
  | 'blue'
  | 'purple'
  | 'light'
  | 'orange'
  | 'dark-blue'
  | 'gray';

interface CaptionProps {
  children: React.ReactNode;
  color?: CaptionColor;
  bold?: boolean;
  lowercase?: boolean;
}

export default function Caption({
  children,
  color = 'gray',
  bold,
  lowercase,
  ...props
}: CaptionProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div
      className={classnames({
        [s.caption]: true,
        [s[color]]: true,
        [s[theme]]: true,
        [s.bold]: bold,
        [s.lowercase]: lowercase,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
