import React, { useState } from 'react';
import classnames from 'classnames';
import s from './Tooltip.module.scss';
import Text from '../PageElements/Text';
import { useColorMode } from '@docusaurus/theme-common';

interface TooltipProps {
  tip: string;
  forceHide?: boolean;
  children: React.ReactNode;
}

export default function Tooltip({ tip, forceHide, children }: TooltipProps) {
  const { colorMode: theme } = useColorMode();
  const [showTooltop, setShowTooltip] = useState<boolean>(false);
  return (
    <div className={s.tooltipWrapper}>
      {!forceHide && showTooltop && (
        <span
          data-hook="tooltip"
          className={classnames({
            [s.tooltip]: true,
            [s[theme]]: true,
          })}
        >
          <Text size="tiny">{tip}</Text>
        </span>
      )}
      <span
        data-hook="btn-wrapper"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {children}
      </span>
    </div>
  );
}
