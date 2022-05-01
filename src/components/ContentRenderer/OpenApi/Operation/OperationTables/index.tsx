import React from 'react';
import {
  resolveBodyParams,
  resolvePathParams,
  resolveQueryParams,
  resolveResponseParams,
} from './params-resolvers';
import { OpenApiTypes } from '@wix/autodocs';
import { LayoutType } from '@wix/ambassador-apis-docs-v2-portal/types';
import { DocsOperationObject, TableTypes } from '../../../../../types';
import { useOpenApiContent } from '../../../../../Context/OpenAPIContentContext';
import ParamsTable from '../../../../ParamsTable';
import EmptyState from '../../../../ParamsTable/EmptyState';

interface OperationTablesProps {
  operation: DocsOperationObject;
  components: OpenApiTypes.ComponentsObject;
}

export default function OperationTables({
  operation,
  components,
}: OperationTablesProps) {
  const { state: { activeLayoutType } } = useOpenApiContent();

  const pathParams = React.useMemo(() => resolvePathParams(operation), [
    operation,
  ]);
  const queryParams = React.useMemo(() => resolveQueryParams(operation), [
    operation,
  ]);
  const bodyParams = React.useMemo(
    () => resolveBodyParams(operation, components),
    [operation, components],
  );
  const responseParams = React.useMemo(
    () => resolveResponseParams(operation, components),
    [operation, components],
  );

  const shouldDisplayRpc =
    operation.rpcOnly || activeLayoutType === LayoutType.RPC;

  const hasRequestParams = !![...pathParams, ...queryParams, ...bodyParams]
    .length;

  /*
    We use React.memo in order to avoid redundant rerenders,
    we will render the following only if the operation was changed.
  */
  return React.useMemo(() => {
    return (
      <div>
        {hasRequestParams ? (
          shouldDisplayRpc ? (
            <ParamsTable
              title={"Request"}
              params={[...pathParams, ...bodyParams]}
              tableType={TableTypes.REQUEST}
            />
          ) : (
            <>
              <ParamsTable
                title={"Path Params"}
                params={pathParams}
                tableType={TableTypes.REQUEST}
              />
              <ParamsTable
                title={"Query Params"}
                params={queryParams}
                tableType={TableTypes.REQUEST}
              />
              <ParamsTable
                title={"Body Params"}
                params={bodyParams}
                tableType={TableTypes.REQUEST}
              />
            </>
          )
        ) : (
          <EmptyState
            title={"Request"}
            text={"This endpoint does not take any parameters"}
          />
        )}

        {responseParams.length ? (
          <ParamsTable
            title={shouldDisplayRpc ? "Response" : "Response Object"}
            params={responseParams}
            subtitle={getResponseSubtitle()}
            tableType={TableTypes.RESPONSE}
          />
        ) : (
          <EmptyState
            title={"Response"}
            text={"Returns an empty object."}
          />
        )}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operation, components, activeLayoutType]);

  function getResponseSubtitle() {
    return operation?.responses?.['200']?.description;
  }
}
