import * as React from 'react';
import classnames from 'classnames';
import s from './Bold.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface BoldProps {
  children: React.ReactNode;
}

export default function ({ children, ...props }: BoldProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <strong
      className={classnames({
        [s.bold]: true,
        [s[theme]]: true,
      })}
      {...props}
    >
      {children}
    </strong>
  );
}
