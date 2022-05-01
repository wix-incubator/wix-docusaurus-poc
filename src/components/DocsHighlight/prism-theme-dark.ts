import { PrismTheme } from 'prism-react-renderer';

export default {
  plain: {
    color: '#dadce1',
    backgroundColor: '#303649',
    margin: 0,
    'font-size': '14px',
    'font-family': "Menlo, Monaco, Consolas, 'Lucida Console', monospace",
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#999988',
        fontStyle: 'italic',
      },
    },
    {
      types: ['namespace'],
      style: {
        opacity: 0.7,
      },
    },
    {
      types: ['string', 'attr-value'],
      style: {
        color: '#8cb4ff',
      },
    },
    {
      types: ['punctuation', 'operator'],
      style: {
        color: '#eda200',
      },
    },
    {
      types: [
        'entity',
        'url',
        'symbol',
        'number',
        'boolean',
        'variable',
        'constant',
        'property',
        'regex',
        'inserted',
      ],
      style: {
        color: '#36acaa',
      },
    },
    {
      types: ['atrule', 'keyword', 'attr-name', 'selector'],
      style: {
        color: '#00a4db',
      },
    },
    {
      types: ['function', 'deleted', 'tag'],
      style: {
        color: '#00ceab',
      },
    },
    {
      types: ['function-variable'],
      style: {
        color: '#6f42c1',
      },
    },
    {
      types: ['tag', 'selector', 'keyword'],
      style: {
        color: '#00ceab',
      },
    },
  ],
} as PrismTheme;
