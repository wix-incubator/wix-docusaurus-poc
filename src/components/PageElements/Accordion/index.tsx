import * as React from 'react';
import { ComponentProps } from 'react';
import AccordionItem from './AccordionItem';

interface Item {
  title?: string;
  content: React.ReactNode | string;
}

interface AccordionProps extends ComponentProps<'div'> {
  items: Item[];
}

export default function Accordion({ items, ...props }: AccordionProps) {
  return (
    <>
      {items.map(({ content, title }, index) => (
        <AccordionItem key={index} title={title} content={content} {...props} />
      ))}
    </>
  );
}
