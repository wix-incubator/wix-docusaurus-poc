import { ArrayOfReferenceType, Param, ReferenceType, TypeDetails } from '@site/src/types';
import { OpenApiTypes } from '@wix/autodocs';
import { get, pickBy } from 'lodash';

const MAX_DEPTH = 30;
export function resolveParamsBySchema(
  schema: OpenApiTypes.SchemaObject,
  components: OpenApiTypes.ComponentsObject,
  requiredFields?: string[],
  depth: number = 0,
) {
  const schemaProperties = schema.properties || {};
  const _requiredFields = (schema.required || requiredFields || []).filter(
    (path) => path.split('.').length > depth,
  );

  /* In order to avoid infinite loop, there are some cases in the chain that property has the same $ref as the parent */
  const shouldResolveParams = depth < MAX_DEPTH;
  if (shouldResolveParams) {
    const propertiesParams = Object.keys(schemaProperties)?.reduce<Param[]>(
      (acc, propKey) => {
        const property = schemaProperties[propKey];
        const param: Param = toParam(
          property,
          components,
          _requiredFields,
          depth,
        );
        return [...acc, param];
      },
      [],
    );

    const oneOfParams: Param[] = resolveOneOfParams(
      schema,
      components,
      _requiredFields,
      depth,
    );

    return [...propertiesParams, ...oneOfParams];
  }
  return [];
}

export function resolveParamsByReferenceSchema(
  $ref: string,
  components: OpenApiTypes.ComponentsObject,
  requiredFields: string[] = [],
  depth: number = 0,
) {
  const referenceSchema = resolveSchemaByRef($ref, components);
  return resolveParamsBySchema(
    referenceSchema,
    components,
    requiredFields,
    depth,
  );
}

function toParam(
  property: OpenApiTypes.Property,
  components: OpenApiTypes.ComponentsObject,
  requiredFields: string[],
  depth: number,
): Param {
  const name = ((property as OpenApiTypes.ReferenceObject).summary ||
    (property as OpenApiTypes.SchemaObject).title)!;

  let description = property.description!;
  const enumValues = (property as OpenApiTypes.SchemaObject).enum;
  if (enumValues?.length) {
    description = `Supported values: ${enumValues
      .map((value) => '`' + value + '`')
      .join(', ')}`;
  }

  const typeDetails = resolveTypeDetails(property, components);

  let paramsDetails: Partial<Param> = {};

  if (
    typeDetails.type === 'object' ||
    (typeDetails as ArrayOfReferenceType).arrayOf === 'object'
  ) {
    /* In case it is reference type or array of reference type we should resolve the reference params */
    const $ref =
      (typeDetails as ReferenceType).$ref! ||
      (typeDetails as ArrayOfReferenceType).$ref!;

    const params = resolveParamsByReferenceSchema(
      $ref,
      components,
      requiredFields,
      depth + 1,
    );
    paramsDetails = { params };
  }

  const annotations = resolveAnnotations(requiredFields, property);

  return {
    name,
    description,
    typeDetails,
    ...paramsDetails,
    ...annotations,
  };
}

function resolveTypeDetails(
  property: OpenApiTypes.SchemaObject,
  components: OpenApiTypes.ComponentsObject,
): TypeDetails {
  const $ref = (property as OpenApiTypes.ReferenceObject).$ref;
  if ($ref) {
    /* Reference type */
    const referenceSchema = resolveSchemaByRef($ref, components);
    return { type: 'object', $ref, typeDisplayName: referenceSchema.title! };
  } else {
    switch (property.type) {
      case 'array':
        /* Array type */
        const referenceType = (property.items as OpenApiTypes.ReferenceObject)
          .$ref;

        const primitiveType = (property.items as OpenApiTypes.SchemaObject)
          .type as string;

        const arrayOf = referenceType ? 'object' : primitiveType;

        /* If it is array of object we should resolve the object type display name */
        const arrayOfTypeDisplayName = (referenceType
          ? referenceType.split('.').pop()
          : primitiveType)!;

        const referenceDetails = referenceType ? { $ref: referenceType } : {};
        return {
          type: 'array',
          arrayOf,
          typeDisplayName: `Array<${arrayOfTypeDisplayName}>`,
          ...referenceDetails,
        };
      case 'object':
        /* Probably missing data in Business schema about the type */
        return { type: 'struct' };
      default:
        /* Primitive type */
        return { type: property.type as string };
    }
  }
}

function resolveSchemaByRef(
  $ref: string,
  components: OpenApiTypes.ComponentsObject,
) {
  const path = resolvePathByRef($ref);
  const schema = get(components, path) as OpenApiTypes.SchemaObject;
  return schema;
}

function resolvePathByRef($ref: string) {
  return $ref.replace('#/components/', '').split('/');
}

function resolveOneOfParams(
  schema: OpenApiTypes.SchemaObject,
  components: OpenApiTypes.ComponentsObject,
  requiredFields: string[],
  depth: number,
): Param[] {
  const oneOfProperties = schema.oneOf as OpenApiTypes.ReferenceObject[];
  return (
    oneOfProperties?.map((prop) => {
      const description = prop.description!;
      const summary = prop.summary!;
      const $ref = prop.$ref!;

      const annotations = resolveAnnotations(requiredFields, prop);

      return {
        description,
        name: summary,
        isOneOf: true,
        params: resolveParamsByReferenceSchema(
          $ref,
          components,
          requiredFields,
          depth + 1,
        ),
        ...annotations,
      };
    }) || []
  );
}

function resolveAnnotations(
  requiredFields: string[],
  property: OpenApiTypes.Property,
) {
  const name =
    (property as OpenApiTypes.ReferenceObject).summary ||
    (property as OpenApiTypes.SchemaObject).title;

  const required = !!requiredFields.some(
    (requiredField) => requiredField.split('.').pop() === name,
  );
  const optional = !required;
  const readOnly = !!(property as OpenApiTypes.SchemaObject).readOnly;
  const deprecated = !!(property as OpenApiTypes.SchemaObject).deprecated;

  /* pickBy Boolean to remove redundant falsy values */
  return pickBy({ required, optional, readOnly, deprecated }, Boolean);
}
