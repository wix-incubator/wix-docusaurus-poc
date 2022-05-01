import React from 'react';
import s from './OneOfCaption.module.scss';
import Caption from '../../../PageElements/Caption';
import { useColorMode } from '@docusaurus/theme-common';

interface OneOfCaptionProps {
  optional?: boolean;
  required?: boolean;
}

export default function OneOfCaption({
  optional,
  required,
}: OneOfCaptionProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div className={s.oneOfCaption} data-hook="one-of-label">
      <Caption bold>{"ONE OF:"}</Caption>
      {optional && (
        <Caption bold data-hook="one-of-optional-annotation">
          {"Optional"}
        </Caption>
      )}
      {required && (
        <Caption bold color="yellow" data-hook="one-of-required-annotation">
          {"Required"}
        </Caption>
      )}
    </div>
  );
}
