import React from 'react';
import classnames from 'classnames';
import s from './TableRow.module.scss';
import TableColumn from '../TableColumn';
import ParamsTableNameDisplay from './ParamsTableNameDisplay';
import ParamsTableTypeDisplay from './ParamsTableTypeDisplay';
import ParamsTable from '..';
import { Param, TableTypes } from '@site/src/types';
import { useColorMode } from '@docusaurus/theme-common';
import DocsMarkdownDisplay from '../../DocsMarkdownDisplay';

interface TableRowProps {
  param: Param;
  tableDepth?: number;
  isFirst: boolean;
  isOpen: boolean;
  beforeOpen: boolean;
  isOneOfOption?: boolean;
  beforeOneOf?: boolean;
  tableType: TableTypes;
  onRowClick: () => any;
}

export default function TableRow({
  param,
  tableDepth = 0,
  isOpen,
  isFirst,
  tableType,
  beforeOpen,
  onRowClick,
  beforeOneOf,
  isOneOfOption,
}: TableRowProps) {
  const { colorMode: theme } = useColorMode();
  const isExpandable = !!param.params?.length;

  return (
    <>
      <div
        role="row"
        className={classnames({
          [s.row]: true,
          [s[theme]]: true,
          [s.first]: isFirst || beforeOpen,
          [s.isFirstOneOf]: isFirst && isOneOfOption,
          [s.beforeOneOf]: beforeOneOf,
          [s.roundBelow]: beforeOpen || isOpen,
          [s.pointerCursor]: isExpandable,
        })}
        onClick={isExpandable ? () => onRowClick() : undefined}
        data-hook={`row-${param.name}`}
      >
        <TableColumn widthInPrecentage={30}>
          <ParamsTableNameDisplay
            name={param.name}
            isOpen={isOpen}
            isExpandable={isExpandable}
            {...getRowAnnotations()}
          />
        </TableColumn>
        <TableColumn widthInPrecentage={25}>
          <ParamsTableTypeDisplay typeDetails={param.typeDetails!} />
        </TableColumn>
        <TableColumn widthInPrecentage={40}>
          <DocsMarkdownDisplay markdown={param.description} />
        </TableColumn>
      </div>
      {isOpen && (
        <ParamsTable
          tableDepth={tableDepth + 1}
          params={param.params || []}
          tableType={tableType}
        />
      )}
    </>
  );

  function getRowAnnotations() {
    const { required, readOnly, optional, deprecated } = param;

    return {
      required: tableType === TableTypes.REQUEST && required,
      optional: tableType === TableTypes.REQUEST && optional,
      readOnly: tableType === TableTypes.ENTITY && readOnly,
      deprecated,
    };
  }
}
