import { FeedbackModalDriver } from './FeedbackModal.driver';
import { Responses } from '../Face';

const onSubmit = jest.fn();
const onCancel = jest.fn();

describe('Feedback Modal', () => {
  const feedbackModalDriver = new FeedbackModalDriver();

  beforeEach(() => {
    onSubmit.mockReset();
    onCancel.mockReset();
  });

  describe('closed modal', () => {
    it('renders correctly', async () => {
      await feedbackModalDriver.when.mount({
        isOpen: false,
        selectedResponse: Responses.YES,
        onSubmit,
        onCancel,
      });

      expect(await feedbackModalDriver.isOpen()).toBeFalsy();
    });
  });

  describe('open modal', () => {
    beforeEach(async () => {
      await feedbackModalDriver.when.mount({
        isOpen: true,
        selectedResponse: Responses.YES,
        onSubmit,
        onCancel,
      });
    });

    it('renders correctly', async () => {
      expect(await feedbackModalDriver.isOpen()).toBeTruthy();
    });

    it('calls onCancel when clicked on dismiss button', async () => {
      await feedbackModalDriver.click.dismissButton();

      expect(onCancel).toHaveBeenCalled();
      expect(feedbackModalDriver.get.messageInput()?.textContent).toEqual('');
      expect(feedbackModalDriver.get.emailInput()?.textContent).toEqual('');
    });

    it('behaves correctly when writing a message', async () => {
      const someString = 'some string';
      await feedbackModalDriver.change.messageInput(someString);

      expect(feedbackModalDriver.get.messageInput()?.value).toEqual(someString);
    });

    it('behaves correctly when writing an invalid email', async () => {
      const someString = 'some string';
      await feedbackModalDriver.change.emailInput(someString);

      expect(feedbackModalDriver.get.emailInput()?.value).toEqual(someString);
      expect(await feedbackModalDriver.is.validEmailInput()).toBe(false);
      expect(await feedbackModalDriver.is.buttonDisabled('Send Us')).toBe(true);
    });

    it('behaves correctly when writing a valid email', async () => {
      const validEmail = 'yaronm@wix.com';
      await feedbackModalDriver.change.emailInput(validEmail);

      expect(feedbackModalDriver.get.emailInput()?.value).toEqual(validEmail);
      expect(await feedbackModalDriver.is.validEmailInput()).toBe(true);
      expect(await feedbackModalDriver.is.buttonDisabled('Send Us')).toBe(
        false,
      );
    });
  });
});
