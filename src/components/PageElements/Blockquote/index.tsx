import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import s from './Blockquote.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface BlockquoteProps extends ComponentProps<'blockquote'> {
  children: React.ReactNode;
}

export default function Blockquote({ children, className }: BlockquoteProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <blockquote
      className={classnames({
        [s.blockquote]: true,
        [s[theme]]: true,
        [s[className || '']]: true,
      })}
    >
      {children}
    </blockquote>
  );
}
