import React from 'react';
import s from './RpcRestSyntax.module.scss';
import { OpenApiTypes } from '@wix/autodocs';
import RpcRestTypeSwitch from './RpcRestTypeSwitch';
import RestEndpoint from './RestEndpoint';
import RpcEndpoint from './RpcEndpoint';
import { Host, LayoutType } from '@wix/ambassador-apis-docs-v2-portal/types';
// import { usePortal } from '../../../../../../../../Context/DocsPortalContext';
import { DocsOperationObject } from '../../../../../types';
import Heading from '../../../../PageElements/Heading';
import { useOpenApiContent } from '../../../../../Context/OpenAPIContentContext';

interface RpcRestSyntaxProps {
  operation: DocsOperationObject;
  servers: OpenApiTypes.ServerObject[];
}

export default function RpcRestSyntax({
  operation,
  servers,
}: RpcRestSyntaxProps) {
  // const {
  //   state: { docsPortal },
  // } = usePortal();
  const docsPortal = { config: {docsUrl: {host: Host.BO}}};

  const {
    state: { activeLayoutType },
  } = useOpenApiContent();

  return (
    <>
      {docsPortal.config?.docsUrl?.host === Host.BO && (
        <div className={s.switchWrapper}>
          <Heading size="h4" data-hook="syntax-label">
            {'Syntax'}
          </Heading>
          <RpcRestTypeSwitch operation={operation} />
        </div>
      )}
      {shouldRenderRestEndpoint() && (
        <RestEndpoint operation={operation} servers={servers} />
      )}

      {shouldRenderRpcEndpoint() && <RpcEndpoint operation={operation} />}
    </>
  );

  function shouldRenderRpcEndpoint() {
    const isInternal = docsPortal.config?.docsUrl?.host === Host.BO;
    const rpcOnly = operation.rpcOnly;
    const rpcLayout = activeLayoutType === LayoutType.RPC;
    return isInternal && (rpcLayout || rpcOnly);
  }

  function shouldRenderRestEndpoint() {
    const hasRest = !operation.rpcOnly;
    const restLayout = activeLayoutType === LayoutType.REST;
    return hasRest && restLayout;
  }
}
