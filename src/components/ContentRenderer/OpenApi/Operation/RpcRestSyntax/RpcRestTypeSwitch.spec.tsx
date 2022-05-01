import { LayoutType } from '@wix/ambassador-apis-docs-v2-portal/types';
import { OpenApiTypes } from '@wix/autodocs';
import { generateDocsPortal } from '../../../../../../../../../__tests__/mocks/portal-mocks';
import { DocsOperationObject } from '../../../../../../../../types';
import { RpcRestSyntaxDriver } from './RpcRestSyntax.driver';

describe('RpcRestSyntax', () => {
  let driver: RpcRestSyntaxDriver;

  beforeEach(async () => {
    driver = new RpcRestSyntaxDriver();
  });
  const docsPortal = generateDocsPortal();
  const operation = generateDocsOperation();
  const servers = generateServers();

  it('should show syntax label when the portal host is BO (RPC & REST portal)', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    expect(driver.exists.syntaxLabel()).toBeTruthy();
  });

  it('should show RpcRestSwitch buttons when the portal host is BO (RPC & REST portal)', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    expect(driver.exists.rpcRestSwich()).toBeTruthy();
  });

  it('Rest Switch button should be active by default', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    expect(await driver.is.activeSwitchBtnByText(LayoutType.RPC)).toBeFalsy();
    expect(await driver.is.activeSwitchBtnByText(LayoutType.REST)).toBeTruthy();
  });

  it('should change the activeLayoutType state by clicking on the switch buttons', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    expect(await driver.is.activeSwitchBtnByText(LayoutType.REST)).toBeTruthy();
    expect(await driver.is.activeSwitchBtnByText(LayoutType.RPC)).toBeFalsy();

    await driver.click.switchBtnByText(LayoutType.RPC);
    expect(await driver.is.activeSwitchBtnByText(LayoutType.RPC)).toBeTruthy();
    expect(await driver.is.activeSwitchBtnByText(LayoutType.REST)).toBeFalsy();

    await driver.click.switchBtnByText(LayoutType.REST);

    expect(await driver.is.activeSwitchBtnByText(LayoutType.REST)).toBeTruthy();
    expect(await driver.is.activeSwitchBtnByText(LayoutType.RPC)).toBeFalsy();
  });

  it('REST switch button should be disabled if the operation has only RPC endpoint', async () => {
    await driver.given({ docsPortal }).when.mount({
      operation: generateDocsOperation({ rpcOnly: true }),
      servers,
    });
    expect(
      await driver.is.disabledSwitchBtnByText(LayoutType.REST),
    ).toBeTruthy();
  });

  it('should show tooltip when hover on REST switch button and the operation has only RPC endpoint', async () => {
    await driver.given({ docsPortal }).when.mount({
      operation: generateDocsOperation({ rpcOnly: true }),
      servers,
    });
    expect(driver.exists.tooltip()).toBeFalsy();
    await driver.hover.btnWrapper();
    expect(driver.exists.tooltip()).toBeTruthy();
  });

  it('should NOT show tooltip when hover on REST switch button and the operation has REST endpoint', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    await driver.hover.btnWrapper();
    expect(driver.exists.tooltip()).toBeFalsy();
  });

  it('should render the relevant endpoint by clicking on the switch buttons', async () => {
    await driver.given({ docsPortal }).when.mount({ operation, servers });
    expect(await driver.is.activeSwitchBtnByText(LayoutType.REST)).toBeTruthy();
    expect(driver.exists.restEndpoint()).toBeTruthy();
    expect(driver.exists.rpcEndpoint()).toBeFalsy();
    expect(driver.get.restEndpoint()).toEqual(
      'https://www.wixapis.com/ecom/v1/orders/v1/orders/{id}',
    );

    await driver.click.switchBtnByText(LayoutType.RPC);

    expect(driver.exists.rpcEndpoint()).toBeTruthy();
    expect(driver.exists.restEndpoint()).toBeFalsy();
    expect(driver.get.rpcEndpoint()).toEqual(
      'rpc GetOrder(GetOrderRequest) returns (GetOrderResponse);',
    );
  });

  function generateDocsOperation(
    overrides?: Partial<DocsOperationObject>,
  ): DocsOperationObject {
    return {
      summary: 'Get Order',
      description: 'Retrieves an order with the provided ID.',
      operationId: 'com.wix.ecom.orders.v1.Orders.GetOrder',
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the order to retrieve.',
          required: true,
        },
      ],
      responses: {
        '200': {
          $ref: '#/components/schemas/com.wix.ecom.orders.v1.GetOrderResponse',
          description: '',
        },
      },
      deprecated: false,
      'x-wix-api': {
        triggeredEvents: [],
        rpcMethodDetails: {
          requestMessage: 'com.wix.ecom.orders.v1.GetOrderRequest',
          responseMessage: 'com.wix.ecom.orders.v1.GetOrderResponse',
        },
      },
      httpMethod: 'GET',
      rpcOnly: false,
      path: '/v1/orders/{id}',
      contentLink: { displayName: 'Get Order', slugifyName: 'get-order' },
      ...overrides,
    };
  }

  function generateServers(): OpenApiTypes.ServerObject[] {
    return [
      { url: 'https://www.wixapis.com/ecom/v1/orders' },
      { url: 'https://www.wixapis.com/ecom/v1/bulk/orders' },
      { url: 'https://manage.wix.com/_api/ecom-orders' },
    ];
  }
});
