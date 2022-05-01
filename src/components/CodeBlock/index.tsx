import * as React from 'react';
import classnames from 'classnames';
import s from './CodeBlock.module.scss';
import { ComponentProps } from 'react';
import Code, { getMarkdownLanguage } from '../PageElements/Code';
import CopyCode from '../CopyCode';
import { useColorMode } from '@docusaurus/theme-common';

interface CodeProps extends ComponentProps<'pre'> {
  code: string;
  inline?: boolean;
  language?: string;
}

export default function CodeBlock({
  code,
  inline = false,
  language = '',
}: CodeProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <>
      {inline ? (
        <code
          className={classnames({
            [s.simpleCode]: true,
            [s[theme]]: true,
          })}
        >
          {code}
        </code>
      ) : (
        <div className={s.codeBox}>
          <Code
            code={code}
            language={language}
            className={classnames({
              [s.codeBlock]: true,
              [s[theme]]: true,
            })}
          />
          <CopyCode
            code={code}
            text={getMarkdownLanguage(language)}
            className={classnames({
              [s.copyCode]: true,
              [s[theme]]: true,
            })}
          />
        </div>
      )}
    </>
  );
}
