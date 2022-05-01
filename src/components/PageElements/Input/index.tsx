import * as React from 'react';
import classnames from 'classnames';
import s from './Input.module.scss';
import { ComponentProps } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface InputProps extends ComponentProps<'input'> {
  value?: string;
  label?: string;
  errorMessage?: string;
  isValid?: boolean;
  rows?: number;
  as?: 'text-area' | 'input';
  onChange: (event: any) => void;
}

export default function Input({
  label,
  onChange,
  errorMessage,
  rows = 1,
  value = '',
  as = 'input',
  isValid = true,
  ...props
}: InputProps) {
  const { colorMode: theme } = useColorMode();

  return (
    <>
      {label && (
        <div
          className={classnames({
            [s.label]: true,
            [s[theme]]: true,
          })}
        >
          {label}
        </div>
      )}
      {as === 'input' ? (
        <input
          value={value}
          onChange={onChange}
          className={classnames({
            [s.input]: true,
            [s[theme]]: true,
            [s.error]: !isValid,
          })}
          {...props}
        />
      ) : (
        // @ts-expect-error
        <textarea
          value={value}
          rows={rows}
          onChange={onChange}
          className={classnames({
            [s.input]: true,
            [s[theme]]: true,
            [s.invalid]: !isValid,
          })}
          {...props}
        />
      )}
      {!isValid && (isValid || errorMessage) && (
        <div
          className={classnames({
            [s.errorMessage]: true,
          })}
        >
          {errorMessage}
        </div>
      )}
    </>
  );
}
