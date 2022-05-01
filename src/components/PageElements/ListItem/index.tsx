import * as React from 'react';
import classnames from 'classnames';
import s from './ListItem.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface ListItemProps {
  children: React.ReactNode;
}

export default function ({ children }: ListItemProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <li
      className={classnames({
        [s.paragraph]: true,
        [s[theme]]: true,
      })}
    >
      {children}
    </li>
  );
}
