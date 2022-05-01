import WasItHelpful from './index';
import { BaseUiDriver } from '../../../__tests__/ui/BaseUIDriver';

export class WasItHelpfulDriver extends BaseUiDriver {
  constructor() {
    super({ component: WasItHelpful });
  }
}
