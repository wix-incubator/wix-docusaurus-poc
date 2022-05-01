import * as React from 'react';
import { FaceFrowning, FaceSmiling } from 'wix-ui-icons-common';

export enum Responses {
  YES = 'yes',
  NO = 'no',
}

interface FaceProps extends React.SVGAttributes<SVGElement> {
  response: Responses;
}

export default function Face({ response, ...props }: FaceProps) {
  return response === Responses.YES ? (
    <FaceSmiling {...props} data-hook="face-happy" />
  ) : (
    <FaceFrowning {...props} data-hook="face-sad" />
  );
}
