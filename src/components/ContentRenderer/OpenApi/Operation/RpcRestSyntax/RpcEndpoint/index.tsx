import React from 'react';
import classnames from 'classnames';
import s from './RpcEndpoint.module.scss';
import { useColorMode } from '@docusaurus/theme-common';
import { DocsOperationObject } from '@site/types';
import DocsHighlight from '../../../../../DocsHighlight';

interface RpcEndpointProps {
  operation: DocsOperationObject;
}

export default function RpcEndpoint({ operation }: RpcEndpointProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div
      className={classnames({
        [s.endpoint]: true,
        [s[theme]]: true,
      })}
    >
      <div className={s.highlightedSignature} data-hook="rpc-endpoint">
        <DocsHighlight
          language="typescript"
          code={getSignture()}
          asCode={false}
        />
      </div>

      <div className={s.tryItOut}>{"Try It Out"}</div>
    </div>
  );

  function getSignture() {
    const { requestMessage, responseMessage } =
      operation['x-wix-api']?.rpcMethodDetails! || {};

    const methodName = operation.operationId?.split('.').pop() || '';
    const methodRequest = requestMessage?.split('.').pop() || '';
    const methodResponse = responseMessage?.split('.').pop() || '';

    return `rpc ${methodName}(${methodRequest}) returns (${methodResponse});`;
  }
}
