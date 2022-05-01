import * as React from 'react';
import { ChevronUp, ChevronDown } from 'wix-ui-icons-common';

interface ChevronProps {
  isUp?: boolean;
}

export default function Chevron({ isUp = false }: ChevronProps) {
  return isUp ? <ChevronUp /> : <ChevronDown />;
}
