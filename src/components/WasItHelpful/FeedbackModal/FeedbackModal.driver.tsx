import FeedbackModal from './index';
import { BaseUiDriver } from '../../../../__tests__/ui/BaseUIDriver';
import { ModalTestkit } from 'wix-style-react/dist/testkit';

export class FeedbackModalDriver extends BaseUiDriver {
  constructor() {
    super({ component: FeedbackModal });
  }

  get = {
    dismissButton: () => this.queryByTestId('modal-dismiss-button'),
    messageInput: () =>
      this.queryByTestId('modal-message-input') as HTMLInputElement,
    emailInput: () =>
      this.queryByTestId('modal-email-input') as HTMLInputElement,
  };

  click = {
    dismissButton: () => this.clickOnElement(this.get.dismissButton()!),
  };

  change = {
    messageInput: (value: string) =>
      this.triggerChangeOnElement(this.get.messageInput()!, value),
    emailInput: (value: string) =>
      this.triggerChangeOnElement(this.get.emailInput()!, value),
  };

  isOpen = () => this.initWSRTestKit(ModalTestkit, 'modal').isOpen();

  is = {
    buttonDisabled: async (text: string) => {
      const btn = await this.findByText(text);
      return btn?.className.includes('disabled');
    },
    validEmailInput: async () => {
      const btn = await this.get.emailInput();
      return !btn?.className.includes('error');
    },
  };
}
