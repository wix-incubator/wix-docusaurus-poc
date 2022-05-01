import * as React from 'react';
import { Modal } from 'wix-style-react';
import classnames from 'classnames';
import s from './FeedbackModal.module.scss';
import { DismissSmall } from 'wix-ui-icons-common';
import Heading from '../../PageElements/Heading';
import Paragraph from '../../PageElements/Paragraph';
import ModalActionButtons from '../ModalActionButtons';
import Face, { Responses } from '../Face';
import Input from '../../PageElements/Input';
import { useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

interface FeedbackModalProps {
  isOpen: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  selectedResponse: Responses;
}

export default function FeedbackModal({
  isOpen,
  onSubmit,
  onCancel,
  selectedResponse,
}: FeedbackModalProps) {
  const { colorMode: theme } = useColorMode();

  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [isFormValid, setIsFormValid] = useState<boolean>();

  const cancel = () => {
    setEmail(undefined);
    setMessage(undefined);
    setIsFormValid(undefined);

    onCancel();
  };

  return (
    <Modal isOpen={isOpen} dataHook="modal">
      <div
        className={classnames({
          [s.feedbackModal]: true,
          [s[theme]]: true,
        })}
      >
        <div
          data-hook="modal-dismiss-button"
          onClick={cancel}
          className={classnames({
            [s.cancelButton]: true,
            [s[theme]]: true,
          })}
        >
          <DismissSmall />
        </div>
        <div
          className={classnames({
            [s.headingWrapper]: true,
          })}
        >
          <div>
            <Face
              response={selectedResponse}
              className={classnames({
                [s.face]: true,
                [s[selectedResponse]]: true,
              })}
            />
          </div>
          <Heading size="h3" bold>
            {"We’re really glad we could help!"}
          </Heading>
        </div>
        <Paragraph>{"We are always striving to improve our documentation quality, and your\nfeedback is valuable to us."}</Paragraph>
        <div
          className={classnames({
            [s.textArea]: true,
          })}
        >
          <Input
            value={message}
            rows={4}
            as="text-area"
            data-hook="modal-message-input"
            label={"Tell us what exactly was helpful"}
            onChange={(event) =>
              setMessage(event.currentTarget.value as string)
            }
          />
        </div>
        <div
          className={classnames({
            [s.input]: true,
          })}
        >
          <Input
            value={email}
            isValid={isFormValid}
            data-hook="modal-email-input"
            label={"Add your email"}
            errorMessage={"Invalid email"}
            onChange={(event) => {
              const updatedMail = event.currentTarget.value as string;

              setEmail(updatedMail);
              setIsFormValid(validateEmail(updatedMail || ''));
            }}
          />
        </div>
        <ModalActionButtons
          onSubmit={onSubmit}
          onCancel={cancel}
          isFormValid={isFormValid!}
        />
      </div>
    </Modal>
  );
}

function  validateEmail(email: string){
  return !!String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
