import * as React from 'react';
import classnames from 'classnames';
import s from './TableHeading.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface TableHeadingProps {
  children: React.ReactNode;
}

export default function ({ children, ...props }: TableHeadingProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <th
      className={classnames({
        [s.tableHeading]: true,
        [s[theme]]: true,
      })}
      {...props}
    >
      {children}
    </th>
  );
}
