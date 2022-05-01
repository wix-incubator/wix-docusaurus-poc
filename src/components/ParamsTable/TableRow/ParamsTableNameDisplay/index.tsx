import React from 'react';
import s from './ParamsTableNameDisplay.module.scss';
import ChevronRightCircle from 'wix-ui-icons-common/ChevronRightCircle';
import classnames from 'classnames';
import ParamAnnotation from './ParamAnnotations';
import { useColorMode } from '@docusaurus/theme-common';
import Paragraph from '../../../PageElements/Paragraph';

interface ParamsTableNameDisplayProps {
  name: string;
  isOpen: boolean;
  deprecated?: boolean;
  required?: boolean;
  optional?: boolean;
  readOnly?: boolean;
  isExpandable: boolean;
}

export default function ParamsTableNameDisplay({
  name,
  isOpen,
  isExpandable,
  ...annotationProps
}: ParamsTableNameDisplayProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div className={s.nameWrapper}>
      <span
        className={classnames({
          [s.iconContainer]: isExpandable,
          [s.empty]: !isExpandable,
        })}
      >
        {isExpandable && (
          <ChevronRightCircle
            data-hook="expand-button"
            className={classnames({
              [s.chevronIcon]: true,
              [s[theme]]: true,
            })}
            style={{
              transform: `rotate(${isOpen ? '90' : '0'}deg)`,
            }}
          />
        )}
      </span>

      <div>
        <Paragraph bold size="small" data-hook="param-name">
          {name}
        </Paragraph>
        <ParamAnnotation {...annotationProps} />
      </div>
    </div>
  );
}
