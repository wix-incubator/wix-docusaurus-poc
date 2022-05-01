import * as React from 'react';
import s from './CodeExample.module.scss';
// import { Collapse } from 'wix-style-react';
import {Collapse} from 'react-collapse';
import CopyCode from '../../CopyCode';
import Chevron from '../../Chevron';
import { ComponentProps, useState } from 'react';
import classnames from 'classnames';
import Code, { getMarkdownLanguage } from '../../PageElements/Code';
import prismThemeLightExamples from '../../PageElements/Code/prism-theme-light-examples';
import { useColorMode } from '@docusaurus/theme-common';

interface CodeExampleProps extends ComponentProps<'div'> {
  code: string;
  language?: string;
  title?: string;
  isLast?: boolean;
}

export default function CodeExample({
  code,
  title = '',
  language = '',
  isLast,
  ...props
}: CodeExampleProps) {
  const { colorMode: theme } = useColorMode();

  const [open, setOpen] = useState(true);

  return (
    <div {...props}>
      <div
        className={classnames({
          [s.title]: true,
          [s[theme]]: true,
          [s.open]: open,
        })}
        onClick={() => setOpen(!open)}
      >
        <div>{title}</div>
        <CopyCode
          code={code}
          text={
            <div className={s.flexDisplay}>
              <div>{getMarkdownLanguage(language)}</div>
              <Chevron isUp={open} />
            </div>
          }
        />
      </div>
      <Collapse isOpened={open}>
        <Code
          prismTheme={theme === "light" ? prismThemeLightExamples : undefined}
          code={code}
          language={language}
          className={classnames({
            [s.code]: true,
            [s[theme]]: true,
          })}
        />
      </Collapse>
    </div>
  );
}
