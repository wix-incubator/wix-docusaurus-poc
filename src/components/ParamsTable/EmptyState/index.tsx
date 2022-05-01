import * as React from 'react';
import Heading from '../../PageElements/Heading';
import Text from '../../PageElements/Text';
import s from './EmptyState.module.scss';

interface EmptyStateProps {
  title: string;
  text?: string;
}

export default function EmptyState({ title, text }: EmptyStateProps) {
  return (
    <>
      <div className={s.title}>
        <Heading size="h3">{title}</Heading>
      </div>
      <div className={s.text}>
        <Text>{text}</Text>
      </div>
    </>
  );
}
