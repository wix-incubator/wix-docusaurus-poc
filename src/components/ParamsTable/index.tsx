import React, { useState } from 'react';
import TableWrapper from './TableWrapper';
import TableRow from './TableRow';
import { Param, TableTypes } from '../../types';

interface ParamsTableProps {
  params: Param[];
  tableDepth?: number;
  title?: string;
  subtitle?: string;
  isOneOf?: boolean;
  tableType: TableTypes;
}

export default function ParamsTable({
  params,
  tableDepth = 0,
  title,
  subtitle,
  isOneOf,
  tableType,
  ...annotations
}: ParamsTableProps) {
  const [openRowIndexes, setOpenRowIndexes] = useState<{
    [key: string]: boolean;
  }>({});

  const filteredParams = getRelevantRows();

  return filteredParams.length ? (
    <TableWrapper
      title={title}
      subtitle={subtitle}
      tableDepth={tableDepth}
      isOneOf={isOneOf}
      {...annotations}
    >
      {filteredParams.map((param, rowIndex) => {
        return param.isOneOf ? (
          <ParamsTable
            key={param.name}
            params={param.params!}
            isOneOf={true}
            tableType={tableType}
            {...getTableAnnotations(param)}
          />
        ) : (
          <TableRow
            key={param.name}
            param={param}
            beforeOpen={!!openRowIndexes[rowIndex - 1]}
            isOpen={openRowIndexes[rowIndex]}
            isFirst={rowIndex === 0}
            onRowClick={() => toggleRows(rowIndex)}
            tableType={tableType}
            isOneOfOption={isOneOf}
            beforeOneOf={filteredParams[rowIndex + 1]?.isOneOf}
          />
        );
      })}
    </TableWrapper>
  ) : (
    <></>
  );

  function getRelevantRows() {
    /*
        We will show params in table for the following:
        1. When presenting ENTITY or RESPONSE (NOT REQUEST), we will show all params.
        2. Required - when it's required param
        3. NOT readOnly - when presenting REQUEST and it's not readOnly param
        4. When presenting REQUEST and its not Object with optionl readOnly params.
    */
    return params.filter((param) => {
      const isRequest = tableType === TableTypes.REQUEST;
      const isObjectWithOptionalReadOnlyParams =
        isRequest && param.params?.every((p) => p.readOnly && !p.required);

      const annotationFilters = !isRequest || param.required || !param.readOnly;
      return annotationFilters && !isObjectWithOptionalReadOnlyParams;
    });
  }

  function getTableAnnotations(param: Param) {
    const { required, optional } = param;

    return {
      required: tableType === TableTypes.REQUEST && required,
      optional: tableType === TableTypes.REQUEST && optional,
    };
  }

  function toggleRows(index: number) {
    setOpenRowIndexes((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }
}
