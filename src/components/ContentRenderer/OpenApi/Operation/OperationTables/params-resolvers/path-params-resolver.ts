import { DocsOperationObject, Param } from '@site/src/types';
import { OpenApiTypes } from '@wix/autodocs';

export function resolvePathParams(operation: DocsOperationObject) {
  const operationParameter = (operation.parameters ||
    []) as OpenApiTypes.ParameterObject[];

  return operationParameter
    .filter((param) => param.in === 'path')
    .map<Param>((pathParam) => ({
      name: pathParam.name,
      description: pathParam.description || '',
      typeDetails: { type: 'string' },
      required: true,
    }));
}
