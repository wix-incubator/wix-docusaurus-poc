import { useColorMode } from '@docusaurus/theme-common';
import classnames from 'classnames';
import React from 'react';
import s from './Divider.module.scss';

export default function Divider({ id }: { id: string }) {
  const { colorMode: theme } = useColorMode();

  return (
    <div
      className={classnames({ [s.divider]: true, [s[theme]]: true })}
      data-hook={getDividerId(id)}
    />
  );
}

export function getDividerId(id: string) {
  return `divider-${id}`;
}
