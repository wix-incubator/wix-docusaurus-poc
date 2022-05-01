import { TypeDetails } from '@site/src/types';
import * as React from 'react';
import Paragraph from '../../../PageElements/Paragraph';

interface ParamsTableTypeDisplayProps {
  typeDetails: TypeDetails;
}

export default function ParamsTableTypeDisplay({
  typeDetails,
}: ParamsTableTypeDisplayProps) {
  const typeToPresent = typeDetails.typeDisplayName || typeDetails.type;
  return (
    <Paragraph size="small" data-hook="param-type">
      {typeToPresent}
    </Paragraph>
  );
}
