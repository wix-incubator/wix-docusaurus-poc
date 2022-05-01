import { ResponseButtonDriver } from './ResponseButton.driver';
import { Responses } from '../Face';
import { upperFirst } from 'lodash';

const onResponseSelect = jest.fn();

describe('Response Button', () => {
  const responseButtonDriver = new ResponseButtonDriver();

  beforeEach(() => {
    onResponseSelect.mockReset();
  });

  describe.each([[Responses.YES], [Responses.NO]])(
    '%s button',
    (response: Responses) => {
      it('renders correctly when there is no selected response', async () => {
        await responseButtonDriver.when.mount({
          response,
          onResponseSelect,
        });

        const responseButton = responseButtonDriver.queryByTestId(
          'response-button',
        );

        const className = responseButton?.className;

        expect(responseButton?.textContent).toBe(upperFirst(response));
        expect(className?.includes(response)).toBeTruthy();
        expect(className?.includes(`${response}Selected`)).toBeFalsy();
      });

      it.each([[Responses.YES], [Responses.NO]])(
        'renders correctly when the selected response is "%s"',
        async (selectedResponse: Responses) => {
          await responseButtonDriver.when.mount({
            response,
            selectedResponse,
            onResponseSelect,
          });

          const responseButton = responseButtonDriver.queryByTestId(
            'response-button',
          );

          if (response !== selectedResponse) {
            expect(responseButton).toBe(null);
          } else {
            const className = responseButton?.className;

            expect(responseButton?.textContent).toBe(upperFirst(response));
            expect(className?.includes(response)).toBeTruthy();
            expect(className?.includes(`${response}Selected`)).toBeTruthy();
          }
        },
      );
    },
  );
});
