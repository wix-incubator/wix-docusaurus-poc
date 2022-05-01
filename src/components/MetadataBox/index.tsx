import { useColorMode } from '@docusaurus/theme-common';
import classnames from 'classnames';
import React from 'react';
import s from './MetadataBox.module.scss';

interface MetadataBoxProps {
  infoMap: { [key: string]: string };
}

export default function MetadataBox({ infoMap }: MetadataBoxProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div className={classnames({ [s.metadataBox]: true, [s[theme]]: true })}>
      {Object.entries(infoMap).map(([key, value]) => (
        <div key={key}>
          <div className={s.metadataBoxTitle}>{key}:</div>
          <div className={s.metadataBoxText}>{value}</div>
        </div>
      ))}
    </div>
  );
}
