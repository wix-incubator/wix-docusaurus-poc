import * as React from 'react';
// import { Collapse } from 'wix-style-react';
import {Collapse} from 'react-collapse';
import classnames from 'classnames';
import { useState } from 'react';
import Chevron from '../../../Chevron';
import s from './AccordionItem.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface AccordionItemProps {
  content: React.ReactNode | string;
  title?: string;
  openInitially?: boolean;
}

export default function AccordionItem({
  content,
  title = '',
  openInitially = false,
}: AccordionItemProps) {
  const { colorMode: theme } = useColorMode();
  const [isOpen, setIsOpen] = useState<boolean>(openInitially);

  return (
    <div
      className={classnames({
        [s.accordionItem]: true,
        [s[theme]]: true,
      })}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={classnames({
          [s.title]: true,
          [s[theme]]: true,
        })}
      >
        <div>{title}</div>
        <Chevron isUp={isOpen} />
      </div>
      <Collapse isOpened={isOpen}>{content}</Collapse>
    </div>
  );
}
