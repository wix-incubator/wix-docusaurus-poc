import React from 'react';
import classnames from 'classnames';
import s from './RestEndpoint.module.scss';
import { OpenApiTypes } from '@wix/autodocs';
import { useColorMode } from '@docusaurus/theme-common';
import { DocsOperationObject } from '@site/types';

interface RestEndpointProps {
  operation: DocsOperationObject;
  servers: OpenApiTypes.ServerObject[];
}

export default function RestEndpoint({
  operation,
  servers,
}: RestEndpointProps) {
  const { colorMode: theme } = useColorMode();

  const { httpMethod } = operation;

  return (
    <div
      className={classnames({
        [s.endpoint]: true,
        [s[theme]]: true,
      })}
    >
      <div
        className={classnames({
          [s.httpMethodTag]: true,
          [s[httpMethod!]]: true,
          [s[theme]]: true,
        })}
      >
        {operation.httpMethod?.toUpperCase()}
      </div>
      <div data-hook="rest-endpoint" className={s.path}>
        {servers[0].url + operation.path}
      </div>
      <div className={s.tryItOut}>{'Try It Out'}</div>
    </div>
  );
}
