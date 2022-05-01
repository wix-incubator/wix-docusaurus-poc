import React, { ComponentProps } from 'react';
import { PrismTheme, Language } from 'prism-react-renderer';
import DocsHighlight from '../../DocsHighlight';

interface CodeProps extends ComponentProps<'pre'> {
  code: string;
  language?: string;
  prismTheme?: PrismTheme;
}

export default function Code({
  code,
  prismTheme,
  language,
  ...props
}: CodeProps) {
  const resolvedLanguage = getMarkdownLanguage(language);
  const resolvedCode = removeLastNewLine(code);

  return (
    <code>
      <DocsHighlight
        language={resolvedLanguage!}
        code={resolvedCode}
        prismTheme={prismTheme}
        {...props}
      />
    </code>
  );

  function removeLastNewLine(str: string) {
    return str.replace(/^\s+|\s+$/g, '');
  }
}

export function getMarkdownLanguage(
  languageParam: string = '',
): Language | undefined {
  const _language = /language-(\w+)/.exec(languageParam);
  return _language ? (_language[1] as Language) : undefined;
}
