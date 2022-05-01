import React, { useRef, useEffect, useState, ComponentProps } from 'react';
import classnames from 'classnames';
import Duplicate from 'wix-ui-icons-common/DuplicateSmall';
import s from './CopyCode.module.scss';
import { Language } from 'prism-react-renderer';

import { useColorMode } from '@docusaurus/theme-common';

interface CopyCodeProps extends ComponentProps<'div'> {
  text: React.ReactNode | Language;
  code: string;
  overrideTheme?: string;
}

export default function ({
  text,
  code,
  overrideTheme,
  ...props
}: CopyCodeProps) {
  const [copiedCode, setCopiedCode] = useState(false);
  const timeoutRef = useRef<any>(null);

  const { colorMode: theme } = useColorMode();

  useEffect(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCopiedCode(false);
    }, 2000);

    return () => {
      timeoutRef.current && clearTimeout(timeoutRef.current!);
    };
  }, [copiedCode]);

  const copyCode = (event: React.MouseEvent<HTMLElement>) => {
    const el = document.createElement('textarea');
    el.value = code;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand && document.execCommand('copy');
    document.body.removeChild(el);

    setCopiedCode(true);

    event.stopPropagation();
  };

  return (
    <div
      className={classnames({
        [s.copyCode]: true,
        [s.flexDisplay]: true,
      })}
      {...props}
    >
      {text && (
        <>
          <div>{text}</div>
          <div> | </div>
        </>
      )}
      <div
        onClick={copyCode}
        className={classnames({
          [s.copyTextButton]: true,
          [s.flexDisplay]: true,
          [s[overrideTheme || theme]]: true,
        })}
      >
        <Duplicate />
        <div>{` ${copiedCode ? "Copied!" : "Copy Code"}`}</div>
      </div>
    </div>
  );
}
