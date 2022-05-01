import ResponseButton from './index';
import { BaseUiDriver } from '../../../../__tests__/ui/BaseUIDriver';

export class ResponseButtonDriver extends BaseUiDriver {
  constructor() {
    super({ component: ResponseButton });
  }
}
