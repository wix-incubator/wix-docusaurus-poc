import { BaseUiDriver } from '../../../../__tests__/ui/BaseUIDriver';
import Face from './index';

export class FaceDriver extends BaseUiDriver {
  constructor() {
    super({ component: Face });
  }
}
