import { DocsOperationObject, Param, Responses } from '@site/src/types';
import { OpenApiTypes } from '@wix/autodocs';
import { resolveParamsByReferenceSchema } from './common';

export function resolveResponseParams(
  operation: DocsOperationObject,
  components: OpenApiTypes.ComponentsObject,
): Param[] {
  const $ref = (operation.responses?.[
    Responses.OK
  ] as OpenApiTypes.ReferenceObject).$ref;
  return resolveParamsByReferenceSchema($ref, components);
}
