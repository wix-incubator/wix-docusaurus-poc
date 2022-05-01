import React from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkGemoji from 'remark-gemoji';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import {
  getHeadings,
  getParagraph,
  getBlockquote,
  getLink,
  getTable,
  getBold,
  getList,
  getCode,
} from './docsMarkdownHelper';
import s from './DocsMarkdownDisplay.module.scss';
import classnames from 'classnames';

const youtubePlugin = require('gridsome-plugin-remark-youtube');

interface DocsMarkdownDisplayProps {
  markdown: string;
  overrides?: Components;
}

export default function DocsMarkdownDisplay({
  markdown,
  overrides,
}: DocsMarkdownDisplayProps) {

  return (
    <div
      className={classnames({
        [s.docsMarkdownDisplay]: true,
      })}
    >
      <ReactMarkdown
        remarkPlugins={[
          [youtubePlugin, { width: '500px', align: 'auto' }],
          [remarkGfm],
          [remarkGemoji],
        ]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          ...getCode(),
          ...getBold(),
          ...getList(),
          ...getTable(),
          ...getHeadings(),
          ...getParagraph(),
          ...getBlockquote(),
          ...getLink(),
          ...overrides,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
