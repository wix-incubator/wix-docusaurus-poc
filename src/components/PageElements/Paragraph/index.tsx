import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import s from './Paragraph.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface ParagraphProps extends ComponentProps<'p'> {
  children: React.ReactNode;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  bold?: boolean;
}

export default function Paragraph({
  children,
  size = 'medium',
  bold,
  ...props
}: ParagraphProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <p
      className={classnames({
        [s.paragraph]: true,
        [s[theme]]: true,
        [s[size]]: true,
        [s.bold]: bold,
      })}
      {...props}
    >
      {children}
    </p>
  );
}
