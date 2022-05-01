import ModalActionButtons from './index';
import { BaseUiDriver } from '../../../../__tests__/ui/BaseUIDriver';

export class ModalActionButtonsDriver extends BaseUiDriver {
  constructor() {
    super({ component: ModalActionButtons });
  }

  get = {
    submitButton: () => this.queryByTestId('submit-button'),
    cancelButton: () => this.queryByTestId('cancel-button'),
  };

  click = {
    submitButton: () => this.clickOnElement(this.get.submitButton()!),
    cancelButton: () => this.clickOnElement(this.get.cancelButton()!),
  };
}
