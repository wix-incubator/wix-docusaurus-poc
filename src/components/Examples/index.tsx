import * as React from 'react';
import s from './Examples.module.scss';
import CodeExample from './CodeExample';
import classnames from 'classnames';
import Paragraph from '../PageElements/Paragraph';
import Accordion from '../PageElements/Accordion';
import { useColorMode } from '@docusaurus/theme-common';
import Text from '../PageElements/Text';
import DocsMarkdownDisplay from '../DocsMarkdownDisplay';

interface Example {
  title?: string;
  markdown: string;
}

interface ExampleContent {
  title: string;
  examples: Example[];
  description?: string;
}

interface ExamplesProps {
  examplesContent: ExampleContent[];
}

export default function Examples({ examplesContent }: ExamplesProps) {
  const { colorMode: theme } = useColorMode();
  return <Accordion items={getItems()} />;

  function getItems() {
    return examplesContent.map(({ title, examples, description }, index) => {
      const content =
        examples.length === 1 && !description ? null /* ToDo:...*/ : (
          <div  key={`example-content-${index}`}>
            {description && (
              <div
                className={classnames({
                  [s.descriptionWrapper]: true,
                  [s[theme]]: true,
                  [s.singleExample]: examplesContent.length === 1,
                })}
              >
                <DocsMarkdownDisplay
                  markdown={description}
                  overrides={{
                    p: ({ children, ...props }) => (
                      <Paragraph
                        {...props}
                        children={children}
                        className={classnames({
                          [s.description]: true,
                          [s[theme]]: true,
                          [s.singleExample]: examplesContent.length === 1,
                        })}
                      />
                    ),
                  }}
                />
              </div>
            )}
            {examples.map(({ markdown, title: _title }, index) => (
              <div
                className={classnames({
                  [s.codeExampleWrapper]: true,
                  [s[theme]]: true,
                })}
              >
                <DocsMarkdownDisplay
                  key={index}
                  markdown={markdown}
                  overrides={{
                    code: ({ className, children }) => (
                      // children[0] is the actual string
                      <CodeExample
                        language={className}
                        code={children[0] as string}
                        title={_title}
                        isLast={examples.length === index + 1}
                      />
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        );

      return {
        key: `example-${index}`,
        title,
        content,
      };
    });
  }
}
