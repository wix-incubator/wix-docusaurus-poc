import * as React from 'react';
import classnames from 'classnames';
import s from './ModalActionButtons.module.scss';
import { useColorMode } from '@docusaurus/theme-common';

interface ModalActionButtonsProps {
  onCancel: () => void;
  onSubmit: () => void;
  isFormValid: boolean;
}

export default function ModalActionButtons({
  onCancel,
  onSubmit,
  isFormValid,
}: ModalActionButtonsProps) {
  const { colorMode: theme } = useColorMode();
  return (
    <div
      data-hook="modal-action-buttons"
      className={classnames({
        [s.formButtons]: true,
      })}
    >
      <div
        data-hook="cancel-button"
        onClick={onCancel}
        className={classnames({
          [s.cancelButton]: true,
          [s[theme]]: true,
        })}
      >
        Cancel
      </div>
      <div
        data-hook="submit-button"
        onClick={() => isFormValid && onSubmit()}
        className={classnames({
          [s.sendButton]: true,
          [s[theme]]: true,
          [s.disabled]: !isFormValid,
        })}
      >
        Send Us
      </div>
    </div>
  );
}
