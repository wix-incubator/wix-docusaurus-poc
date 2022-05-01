import React, { ComponentProps } from 'react';
import classnames from 'classnames';
import s from './Link.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface LinkProps extends ComponentProps<'a'> {
  children: React.ReactNode;
}

export default function Link({ children, ...props }: LinkProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <a
      className={classnames({
        [s.link]: true,
        [s[theme]]: true,
      })}
      {...props}
    >
      {children}
    </a>
  );
}
