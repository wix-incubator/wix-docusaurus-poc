import { WasItHelpfulDriver } from './WasItHelpful.driver';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useTranslation: () => mockedUseNavigate,
}));

describe('Was It Helpful', () => {
  const wasItHelpfulDriver = new WasItHelpfulDriver();

  it('renders the component correctly', async () => {
    await wasItHelpfulDriver.when.mount();

    const wasItHelpful = wasItHelpfulDriver.queryByTestId('was-it-helpful');
    const feedbackModal = wasItHelpfulDriver.queryByTestId('feedback-modal');

    expect(wasItHelpful?.children?.length).toBe(3);
    expect(feedbackModal).toBeDefined();
  });
});
