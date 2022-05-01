import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import s from './TableWrapper.module.scss';
import TableHeader from './TableHeader';
import OneOfCaption from './OneOfCaption';

interface TableWrapperProps {
  title?: string;
  subtitle?: string;
  tableDepth: number;
  isOneOf?: boolean;
  optional?: boolean;
  required?: boolean;
  children: React.ReactNode;
}

export default function TableWrapper({
  tableDepth,
  title,
  subtitle,
  children,
  isOneOf,
  ...annotations
}: TableWrapperProps) {
  const [enterAnimation, setEnterAnimation] = useState(false);

  useEffect(() => {
    if (tableDepth > 0) {
      const enterAnimationTimer = setTimeout(() => setEnterAnimation(true), 5);

      return () => {
        clearTimeout(enterAnimationTimer);
      };
    }
  }, [tableDepth]);

  return (
    <div
      data-hook="params-table"
      role="table"
      aria-label="Object-attribute"
      className={classnames({
        [s.tableWrapper]: true,
        [s.animate]: enterAnimation,
        [s[`depth-${tableDepth}`]]: true,
      })}
    >
      {isOneOf ? (
        <OneOfCaption {...annotations} />
      ) : (
        tableDepth === 0 && (
          <TableHeader
            title={title}
            subtitle={subtitle}
            columnTitles={[
              { label: 'NAME', widthInPrecentage: 30 },
              { label: 'TYPE', widthInPrecentage: 25 },
              { label: 'DESCRIPTION', widthInPrecentage: 40 },
            ]}
          />
        )
      )}
      {children}
    </div>
  );
}
