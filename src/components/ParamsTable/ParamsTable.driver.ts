import {
  BaseUiDriver,
  within,
} from '../../../../../../../__tests__/ui/BaseUIDriver';
import ParamsTable from '.';

export class ParamsTableDriver extends BaseUiDriver {
  constructor() {
    super({ component: ParamsTable });
  }

  get = {
    rowAt: (i: number) => this.getRows()?.[i]!,
    nameAtRow: (i: number) => this.elementAtRow(i, 'param-name')?.textContent,
    typeAtRow: (i: number) => this.elementAtRow(i, 'param-type')?.textContent,
  };

  count = {
    rows: () => {
      const rows = this.getRows() || [];
      /* we need -1 in order not to count the table header row */
      return rows.length ? rows.length - 1 : 0;
    },
    oneOfLables: () => this.queryAllByTestId('one-of-label').length,
  };

  exists = {
    rowAt: (i: number) => !!this.get.rowAt(i),
    requiredLabelAtRow: (i: number) => !!this.elementAtRow(i, 'required-label'),
    optionalLabelAtRow: (i: number) => !!this.elementAtRow(i, 'optional-label'),

    readOnlyLabelAtRow: (i: number) =>
      !!this.elementAtRow(i, 'read-only-label'),
    expandButtonAtRow: (i: number) => !!this.elementAtRow(i, 'expand-button'),
    oneOfLabel: () => !!this.queryByTestId('one-of-label'),
    oneOfRequiredLabel: () =>
      !!this.queryByTestId('one-of-required-annotation'),
    oneOfOptionalLabel: () =>
      !!this.queryByTestId('one-of-optional-annotation'),
  };

  click = {
    expandAtRow: async (i: number) => this.clickOnElement(this.get.rowAt(i)),
  };

  is = {
    expandableAtRow: (i: number) => !!this.exists.expandButtonAtRow(i),
  };

  getRows = () => {
    try {
      return this.wrapper?.getAllByRole('row');
    } catch (e) {}
  };

  elementAtRow = (i: number, dataHook: string) => {
    const row = this?.get?.rowAt(i);
    if (row) {
      return within(row).queryByTestId(dataHook);
    }
  };
}
