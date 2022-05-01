import React from 'react';
import SwitchButton from './SwitchButton';
import { LayoutType } from '@wix/ambassador-apis-docs-v2-portal/types';
import s from './RpcRestTypeSwitch.module.scss';
import { DocsOperationObject } from '@site/types';
import { useOpenApiContent } from '@site/src/Context/OpenAPIContentContext';
import Tooltip from '@site/src/components/Tooltip';

interface RpcRestTypeSwitchProps {
  operation: DocsOperationObject;
}

export default function RpcRestTypeSwitch({
  operation,
}: RpcRestTypeSwitchProps) {
  const {
    state: { activeLayoutType },
    dispatch,
  } = useOpenApiContent();

  return (
    <div className={s.rpcRestTypeSwitch} data-hook="rpc-rest-switch">
      <Tooltip
        tip={"This endpoint doesn't support REST"}
        forceHide={!operation.rpcOnly}
      >
        <SwitchButton
          active={isActive(LayoutType.REST)}
          disabled={operation.rpcOnly}
          onClick={() => setActiveLayoutType(LayoutType.REST)}
        >
          {LayoutType.REST}
        </SwitchButton>
      </Tooltip>
      <SwitchButton
        right
        active={isActive(LayoutType.RPC)}
        onClick={() => setActiveLayoutType(LayoutType.RPC)}
      >
        {LayoutType.RPC}
      </SwitchButton>
    </div>
  );

  function isActive(layoutType: LayoutType) {
    return operation.rpcOnly
      ? layoutType === LayoutType.RPC
      : layoutType === activeLayoutType;
  }

  function setActiveLayoutType(layout: LayoutType) {
    dispatch({
      type: 'setActiveLayoutType',
      activeLayoutType: layout,
    });
  }
}
