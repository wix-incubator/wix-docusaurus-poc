import {
  BaseUiDriver,
  fireEvent,
} from '../../../../../../../../../__tests__/ui/BaseUIDriver';
import RpcRestSyntax from '.';
import { act } from 'react-dom/test-utils';

export class RpcRestSyntaxDriver extends BaseUiDriver {
  constructor() {
    super({ component: RpcRestSyntax });
  }

  get = {
    restEndpoint: () => this.queryByTestId('rest-endpoint')?.textContent,
    rpcEndpoint: () => this.queryByTestId('rpc-endpoint')?.textContent,
  };

  exists = {
    syntaxLabel: () => !!this.queryByTestId('syntax-label'),
    rpcRestSwich: () => !!this.queryByTestId('rpc-rest-switch'),
    tooltip: () => !!this.queryByTestId('tooltip'),
    restEndpoint: () => !!this.queryByTestId('rest-endpoint'),
    rpcEndpoint: () => !!this.queryByTestId('rpc-endpoint'),
  };

  is = {
    activeSwitchBtnByText: async (text: string) => {
      const btn = await this.findByText(text);
      return btn?.className.includes('active');
    },
    disabledSwitchBtnByText: async (text: string) => {
      const btn = await this.findByText(text);
      return btn?.className.includes('disabled');
    },
  };

  click = {
    switchBtnByText: async (text: string) => {
      const btn = await this.findByText(text);
      await this.clickOnElement(btn!);
    },
  };

  hover = {
    btnWrapper: async () => {
      await act(async () => {
        fireEvent.mouseEnter(this.queryByTestId('btn-wrapper')!);
      });
    },
  };
}
