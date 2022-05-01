import React from 'react';
import classnames from 'classnames';
import s from './SwitchButton.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface SwitchButtonProps {
  active?: boolean;
  disabled?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onClick: () => void;
  children: React.ReactNode;
  right?: boolean;
}

export default function SwitchButton({
  active,
  disabled,
  onMouseEnter,
  onMouseLeave,
  onClick,
  children,
  right,
}: SwitchButtonProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <button
      data-hook="switch-btn"
      className={classnames({
        [s.toggleBtn]: true,
        [s[theme]]: true,
        [s.active]: active,
        [s.disabled]: disabled,
        [s.right]: right,
      })}
      onClick={onClick}
      onMouseEnter={onMouseEnter && disabled ? () => onMouseEnter() : undefined}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </button>
  );
}
