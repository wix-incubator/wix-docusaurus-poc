import React from 'react';
import { kebabCase } from 'lodash';
import Caption, { CaptionColor } from '@site/src/components/PageElements/Caption';
import { useColorMode } from '@docusaurus/theme-common';

type ParamAnnotationsProps = {
  deprecated?: boolean;
  required?: boolean;
  optional?: boolean;
  readOnly?: boolean;
};

interface AnnotationConfig {
  color?: CaptionColor;
  text: string;
}

export default function ParamAnnotations({
  ...annotations
}: ParamAnnotationsProps) {
  const { colorMode: theme } = useColorMode();

  const annotationComponentsMap: Record<string, AnnotationConfig> = {
    required: { color: 'yellow', text: "Required" },
    optional: { color: 'gray', text: "Optional" },
    readOnly: { color: 'orange', text: 'Read Only' },
    deprecated: { color: 'red', text: 'Deprecated' },
  };

  const annotationConfigs = Object.entries(annotations)
    .filter(([key, value]) => Boolean(value))
    .map(([key, value]) => ({ ...annotationComponentsMap[key], key }));

  return (
    <div style={{ lineHeight: '1.2' }}>
      {annotationConfigs.map(({ key, color, text }, i) => (
        <React.Fragment key={key}>
          <Caption bold color={color} data-hook={`${kebabCase(key)}-label`}>
            {text}
          </Caption>
          {i !== annotationConfigs.length - 1 && <>, </>}
        </React.Fragment>
      ))}
    </div>
  );
}
