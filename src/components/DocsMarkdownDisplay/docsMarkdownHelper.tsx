import * as React from 'react';
import { Components } from 'react-markdown';
import {
  CodeProps,
  HeadingProps,
  LiProps,
  ReactMarkdownProps,
} from 'react-markdown/lib/ast-to-react';
import Heading from '../PageElements/Heading';
import Paragraph from '../PageElements/Paragraph';
import Blockquote from '../PageElements/Blockquote';
import Link from '../PageElements/Link';
import TableCell from '../PageElements/TableCell';
import TableHeading from '../PageElements/TableHeading';
import Bold from '../PageElements/Bold';
import ListItem from '../PageElements/ListItem';
import CodeBlock from '../CodeBlock';

export function getHeadings(): Components {
  return {
    h1: ({ children, ...props }: HeadingProps) => (
      <Heading {...props} size="h1" children={children} />
    ),
    h2: ({ children, ...props }: ReactMarkdownProps) => (
      <Heading {...props} size="h2" children={children} />
    ),
    h3: ({ children, ...props }: ReactMarkdownProps) => (
      <Heading {...props} size="h3" children={children} />
    ),
    h4: ({ children, ...props }: ReactMarkdownProps) => (
      <Heading {...props} size="h4" children={children} />
    ),
    h5: ({ children, ...props }: ReactMarkdownProps) => (
      <Heading {...props} size="h5" children={children} />
    ),
    h6: ({ children, ...props }: ReactMarkdownProps) => (
      <Heading {...props} size="h6" children={children} />
    ),
  };
}

export function getParagraph(): Components {
  return {
    p: ({ children, ...props }: ReactMarkdownProps) => (
      <Paragraph {...props} children={children} />
    ),
  };
}

export function getBlockquote(): Components {
  return {
    blockquote: ({ children, ...props }: ReactMarkdownProps) => (
      <Blockquote {...props} children={children} />
    ),
  };
}

export function getLink(): Components {
  return {
    a: ({ children, ...props }: ReactMarkdownProps) => (
      <Link {...props} children={children} />
    ),
  };
}

export function getTable(): Components {
  return {
    td: ({ children }) => <TableCell children={children} />,
    th: ({ children }) => <TableHeading children={children} />,
  };
}

export function getBold(): Components {
  return {
    strong: ({ children }) => <Bold children={children} />,
  };
}

export function getList(): Components {
  return {
    li: ({ children }: LiProps) => <ListItem children={children} />,
  };
}

export function getCode(): Components {
  return {
    code: ({ className, children, inline }: CodeProps) => (
      // children[0] is the actual string
      <CodeBlock
        inline={inline}
        language={className}
        code={children[0] as string}
      />
    ),
  };
}
