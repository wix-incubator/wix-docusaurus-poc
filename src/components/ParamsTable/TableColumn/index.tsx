import * as React from 'react';
import s from './TableColumn.module.scss';
import classnames from 'classnames';

interface TableColumnProps {
  children?: any;
  widthInPrecentage: number;
}
export default function TableColumn({
  children,
  widthInPrecentage,
  ...props
}: TableColumnProps) {
  return (
    <span
      role="cell"
      className={classnames({ [s.col]: true })}
      style={{ width: `calc(${widthInPrecentage}%)` }}
      {...props}
    >
      {children}
    </span>
  );
}
