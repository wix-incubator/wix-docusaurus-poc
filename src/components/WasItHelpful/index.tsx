import * as React from 'react';
import classnames from 'classnames';
import s from './WasItHelpful.module.scss';
import ResponseButton from './ResponseButton';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';
import { Responses } from './Face';

export default function WasItHelpful() {
  const [selectedResponse, setSelectedResponse] = useState<Responses>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const onResponseSelect = (response: Responses) => {
    setSelectedResponse(response);
    setIsModalOpen(true);
  };

  const onSubmit = () => {
    // ToDo: submission logic tbd

    setIsModalOpen(false);
  };

  const onCancel = () => {
    setIsModalOpen(false);
    setSelectedResponse(undefined);
  };

  return (
    <>
      <div
        data-hook="was-it-helpful"
        className={classnames({
          [s.wasItHelpful]: true,
        })}
      >
        <div>{"Was this section helpful?"}</div>
        <ResponseButton
          response={Responses.YES}
          selectedResponse={selectedResponse}
          onResponseSelect={onResponseSelect}
        />
        <ResponseButton
          response={Responses.NO}
          selectedResponse={selectedResponse}
          onResponseSelect={onResponseSelect}
        />
      </div>
      {/* <FeedbackModal
        data-hook="feedback-modal"
        isOpen={isModalOpen}
        onSubmit={onSubmit}
        onCancel={onCancel}
        selectedResponse={selectedResponse!}
      /> */}
    </>
  );
}
