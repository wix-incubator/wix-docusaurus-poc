import React from 'react';
import Highlight, {
  defaultProps,
  Language,
  PrismTheme,
} from 'prism-react-renderer';
import lightTheme from './prism-theme-light';
import darkTheme from './prism-theme-dark';
import classnames from 'classnames';
import s from './DocsHighlight.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface DocsHighlightProps {
  language: Language | string;
  code: string;
  asCode?: boolean;
  prismTheme?: PrismTheme;
}
export default function DocsHighlight({
  asCode = true,
  language,
  code,
  prismTheme,
  ...props
}: DocsHighlightProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <Highlight
      {...defaultProps}
      // @ts-expect-errors
      language={language}
      code={code}
      theme={prismTheme || theme === 'dark' ? darkTheme : lightTheme}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={style}
          className={classnames({ [s.code]: asCode })}
          {...props}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
