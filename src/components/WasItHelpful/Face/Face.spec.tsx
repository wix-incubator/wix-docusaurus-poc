import { FaceDriver } from './Face.driver';
import { Responses } from './index';

describe('Face', () => {
  it.each`
    response         | expression
    ${Responses.YES} | ${'happy'}
    ${Responses.NO}  | ${'sad'}
  `('renders $expression face', async ({ response, expression }) => {
    const faceDriver = new FaceDriver();

    await faceDriver
      .given({
        pathname: '/wix-stores/carts/get-order',
        contentLink: { displayName: 'Get Order', slugifyName: 'get-order' },
      })
      .when.mount({ response });

    const face = faceDriver.queryByTestId(`face-${expression}`);

    expect(face).not.toBe(null);
  });
});
