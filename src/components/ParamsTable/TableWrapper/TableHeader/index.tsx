import * as React from 'react';
import s from './TableHeader.module.scss';
import TableColumn from '../../TableColumn';
import classnames from 'classnames';
import Heading from '../../../PageElements/Heading';
import { useColorMode } from '@docusaurus/theme-common';

interface TableHeaderProps {
  title?: string;
  subtitle?: string;
  columnTitles: { label: string; widthInPrecentage: number }[];
}

export default function TableHeader({
  title,
  subtitle,
  columnTitles,
}: TableHeaderProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <>
      {title && <Heading size="h4">{title}</Heading>}
      {subtitle && (
        <div className={s.subtitle}>
          <Heading size="h5">{subtitle}</Heading>
        </div>
      )}
      <div
        role="row"
        className={classnames({
          [s.tableHeader]: true,
          [s[theme]]: true,
        })}
        data-hook="params-table-header"
      >
        {columnTitles.map(({ label, widthInPrecentage }) => (
          <React.Fragment key={label}>
            <TableColumn widthInPrecentage={widthInPrecentage}>
              <Heading size="h7" bold={false}>
                {label}
              </Heading>
            </TableColumn>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
