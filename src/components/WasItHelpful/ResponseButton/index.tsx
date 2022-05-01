import * as React from 'react';
import classnames from 'classnames';
import s from './ResponseButton.module.scss';
import { upperFirst } from 'lodash';
import Face, { Responses } from '../Face';
import { useColorMode } from '@docusaurus/theme-common';

interface ResponseButtonProps {
  response: Responses;
  onResponseSelect: (response: Responses) => void;
  selectedResponse?: Responses;
}

export default function ResponseButton({
  response,
  selectedResponse,
  onResponseSelect,
}: ResponseButtonProps) {
  const { colorMode: theme } = useColorMode();

  return selectedResponse && selectedResponse !== response ? null : (
    <div
      onClick={() => onResponseSelect(response)}
      data-hook="response-button"
      className={classnames({
        [s.responseButton]: true,
        [s[theme]]: true,
        [s[response]]: true,
        [s[`${response}Selected`]]: selectedResponse === response,
      })}
    >
      <Face response={response} className={s.face} />
      <div>{upperFirst(response)}</div>
    </div>
  );
}
