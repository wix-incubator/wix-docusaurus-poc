import { DocsOperationObject, MediaTypes, Param } from '@site/src/types';
import { OpenApiTypes } from '@wix/autodocs';
import { resolveParamsBySchema } from './common';

export function resolveBodyParams(
  operation: DocsOperationObject,
  components: OpenApiTypes.ComponentsObject,
): Param[] {
  const requestBody = operation?.requestBody as OpenApiTypes.RequestBodyObject;
  const mediaType = requestBody?.content?.[MediaTypes.APPLICATION_JSON];

  if (mediaType) {
    const schema = mediaType.schema!;
    return resolveParamsBySchema(schema, components);
  }
  return [];
}
