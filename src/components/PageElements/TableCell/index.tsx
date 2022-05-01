import * as React from 'react';
import classnames from 'classnames';
import s from './TableCell.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface TableCellProps {
  children: React.ReactNode;
}

export default function ({ children, ...props }: TableCellProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <td
      className={classnames({
        [s.tableCell]: true,
        [s[theme]]: true,
      })}
      {...props}
    >
      {children}
    </td>
  );
}
