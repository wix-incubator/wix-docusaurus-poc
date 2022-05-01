import { ModalActionButtonsDriver } from './ModalActionButtons.driver';

const submitMock = jest.fn();
const cancelMock = jest.fn();

describe('Modal Action Buttons', () => {
  const modalActionButtonsDriver = new ModalActionButtonsDriver();

  beforeEach(() => {
    submitMock.mockReset();
    cancelMock.mockReset();
  });

  it('renders correctly', async () => {
    await modalActionButtonsDriver.when.mount({});

    const cancelButton = modalActionButtonsDriver.get.cancelButton();
    const submitButton = modalActionButtonsDriver.get.submitButton();

    expect(cancelButton).toBeDefined();
    expect(submitButton).toBeDefined();
  });

  describe('invalid form', () => {
    beforeEach(async () => {
      await modalActionButtonsDriver.when.mount({
        isFormValid: false,
        onCancel: cancelMock,
        onSubmit: submitMock,
      });
    });

    it('submit button disabled', async () => {
      const submitButton = modalActionButtonsDriver.get.submitButton();

      expect(submitButton?.className?.includes('disabled')).toBeTruthy();
    });

    it('buttons work correctly', async () => {
      await modalActionButtonsDriver.click.cancelButton();
      await modalActionButtonsDriver.click.submitButton();

      expect(cancelMock).toHaveBeenCalled();
      expect(submitMock).not.toHaveBeenCalled();
    });
  });

  describe('valid form', () => {
    beforeEach(async () => {
      await modalActionButtonsDriver.when.mount({
        isFormValid: true,
        onCancel: cancelMock,
        onSubmit: submitMock,
      });
    });

    it('submit button enabled', async () => {
      const submitButton = modalActionButtonsDriver.get.submitButton();

      expect(submitButton?.className?.includes('disabled')).toBeFalsy();
    });

    it('buttons work correctly', async () => {
      await modalActionButtonsDriver.click.cancelButton();
      await modalActionButtonsDriver.click.submitButton();

      expect(cancelMock).toHaveBeenCalled();
      expect(submitMock).toHaveBeenCalled();
    });
  });
});
