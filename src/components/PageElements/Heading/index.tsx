import React from 'react';
import classnames from 'classnames';
import s from './Heading.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface HeadingProps {
  children: React.ReactNode;
  bold?: boolean;
  size: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'h7';
}

export default function Heading({
  size,
  bold = true,
  children,
  ...props
}: HeadingProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div
      className={classnames({
        [s.heading]: true,
        [s[theme]]: true,
        [s[size]]: true,
        [s.bold]: bold,
      })}
      {...props}
    >
      {children}
    </div>
  );
}
