import { Param, TableTypes } from '../../../../../../types';
import { ParamsTableDriver } from './ParamsTable.driver';

describe('ParamsTable', () => {
  // let driver: ParamsTableDriver;
  // beforeEach(async () => {
  //   driver = new ParamsTableDriver();
  // });

  // describe('General', () => {
  //   it('should render the first row with "NAME", "TYPE" and "DESCRIPTION"', async () => {
  //     const params = getRandomData(1);
  //     await driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     const el = driver.queryByTestId('params-table-header');
  //     expect(el?.textContent).toBe('NAMETYPEDESCRIPTION');
  //   });

  //   it('should render amount of rows matching the data', () => {
  //     const numberOfDataRows = 10;
  //     const params = getRandomData(numberOfDataRows);
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.count.rows()).toBe(numberOfDataRows);
  //   });

  //   it('should show Object row when all the params are readOnly for response/entity presentation', async () => {
  //     const params: Param[] = [
  //       {
  //         name: 'object',
  //         description: '',
  //         typeDetails: {
  //           type: 'object',
  //           typeDisplayName: 'Nested',
  //         },
  //         params: [
  //           {
  //             name: 'nested 1',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //             readOnly: true,
  //           },
  //           {
  //             name: 'nested 2',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //             readOnly: true,
  //           },
  //         ],
  //       },
  //     ];
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.RESPONSE,
  //     });

  //     expect(driver.count.rows()).toBe(1);
  //     await driver.click.expandAtRow(1);
  //     expect(driver.count.rows()).toBe(3);
  //   });

  //   it('should NOT show Object row when all the params are readOnly and not required for request presentation', () => {
  //     const params: Param[] = [
  //       {
  //         name: 'object',
  //         description: '',
  //         typeDetails: {
  //           type: 'object',
  //           typeDisplayName: 'Nested',
  //         },
  //         params: [
  //           {
  //             name: 'nested 1',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //             readOnly: true,
  //           },
  //           {
  //             name: 'nested 2',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //             readOnly: true,
  //           },
  //         ],
  //       },
  //     ];
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.count.rows()).toBe(0);
  //   });
  // });

  // describe('Nested Objects', () => {
  //   const params: Param[] = [
  //     {
  //       name: 'object',
  //       description: '',
  //       typeDetails: {
  //         type: 'object',
  //         typeDisplayName: 'Nested',
  //       },
  //       params: [
  //         {
  //           name: 'nested',
  //           description: '',
  //           typeDetails: {
  //             type: 'object',
  //             typeDisplayName: 'AnotherNested',
  //           },
  //           params: [
  //             {
  //               name: 'another-nested',
  //               description: '',
  //               typeDetails: {
  //                 type: 'string',
  //               },
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ];

  //   it('should display expand button and open next params on click if it object', async () => {
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.exists.expandButtonAtRow(1)).toBeTruthy();
  //     await driver.click.expandAtRow(1);
  //     expect(driver.exists.expandButtonAtRow(2)).toBeTruthy();
  //     await driver.click.expandAtRow(2);
  //     expect(driver.exists.expandButtonAtRow(3)).toBeFalsy();
  //   });

  //   it('should present the correct names', async () => {
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.get.nameAtRow(1)).toEqual('object');
  //     await driver.click.expandAtRow(1);
  //     expect(driver.get.nameAtRow(2)).toEqual('nested');
  //     await driver.click.expandAtRow(2);
  //     expect(driver.get.nameAtRow(3)).toEqual('another-nested');
  //   });

  //   it('should present the correct types according to typeDetails', async () => {
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.get.typeAtRow(1)).toEqual('Nested');
  //     await driver.click.expandAtRow(1);
  //     expect(driver.get.typeAtRow(2)).toEqual('AnotherNested');
  //     await driver.click.expandAtRow(2);
  //     expect(driver.get.typeAtRow(3)).toEqual('string');
  //   });
  // });

  // describe('Annotations', () => {
  //   const param: Param = {
  //     name: 'id',
  //     description: '',
  //     typeDetails: {
  //       type: 'string',
  //     },
  //   };
  //   describe('optional annotaion', () => {
  //     it('should show optional label on a required param if it is for response presentation', () => {
  //       driver.when.mount({
  //         params: [{ ...param, required: false, optional: true }],
  //         tableType: TableTypes.REQUEST,
  //       });

  //       expect(driver.exists.optionalLabelAtRow(1)).toBeTruthy();
  //     });
  //     it('should NOT show optional label on a required param if it is for response presentation', () => {
  //       driver.when.mount({
  //         params: [{ ...param, required: true, optional: true }],
  //         tableType: TableTypes.RESPONSE,
  //       });

  //       expect(driver.exists.optionalLabelAtRow(1)).toBeFalsy();
  //     });
  //   });

  //   describe('read only annotaion', () => {
  //     it('should present readOnly annotation if the it is for entity presentation', () => {
  //       driver.when.mount({
  //         params: [{ ...param, readOnly: true }],
  //         tableType: TableTypes.ENTITY,
  //       });

  //       expect(driver.exists.readOnlyLabelAtRow(1)).toBeTruthy();
  //     });

  //     it('should NOT render param with readOnly annotation if the nested table is NOT for entity presentation', () => {
  //       driver.when.mount({
  //         params: [{ ...param, readOnly: true }],
  //         tableType: TableTypes.REQUEST,
  //       });

  //       expect(driver.exists.readOnlyLabelAtRow(1)).toBeFalsy();
  //       expect(driver.exists.rowAt(1)).toBeFalsy();
  //     });
  //   });

  //   describe('required annotation', () => {
  //     it('should present required label for request presentation', async () => {
  //       driver.when.mount({
  //         params: [{ ...param, required: true }],
  //         tableType: TableTypes.REQUEST,
  //       });

  //       expect(driver.exists.requiredLabelAtRow(1)).toBeTruthy();
  //     });
  //     it('should NOT present required label if it is NOT for request presentation', async () => {
  //       driver.when.mount({
  //         params: [{ ...param, required: true }],
  //         tableType: TableTypes.RESPONSE,
  //       });

  //       expect(driver.exists.requiredLabelAtRow(1)).toBeFalsy();
  //     });
  //   });
  // });

  // describe('OneOf', () => {
  //   it('should render oneof', () => {
  //     const params: Param[] = [
  //       {
  //         name: 'name',
  //         description: '',
  //         isOneOf: true,
  //         required: true,
  //         params: [
  //           {
  //             name: 'first name',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //           },
  //           {
  //             name: 'last name',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //           },
  //           {
  //             name: 'full name',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //           },
  //         ],
  //       },
  //     ];
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.exists.oneOfLabel()).toBeTruthy();
  //     expect(driver.count.rows()).toBe(3);
  //     expect(driver.get.nameAtRow(1)).toEqual('first name');
  //     expect(driver.get.nameAtRow(2)).toEqual('last name');
  //     expect(driver.get.nameAtRow(3)).toEqual('full name');
  //     expect(driver.exists.oneOfRequiredLabel()).toBeTruthy();
  //   });

  //   it('should render nested oneof', async () => {
  //     const params: Param[] = [
  //       {
  //         name: 'name',
  //         description: '',
  //         isOneOf: true,
  //         params: [
  //           {
  //             name: 'first name',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //           },
  //           {
  //             name: 'last name',
  //             description: '',
  //             typeDetails: { type: 'string' },
  //           },
  //           {
  //             name: 'full name',
  //             description: '',
  //             isOneOf: true,
  //             params: [
  //               {
  //                 name: 'option a',
  //                 description: '',
  //                 typeDetails: { type: 'string' },
  //               },
  //               {
  //                 name: 'option b',
  //                 description: '',
  //                 typeDetails: { type: 'object', typeDisplayName: 'Full Name' },
  //                 params: [
  //                   {
  //                     name: 'first',
  //                     description: '',
  //                     typeDetails: { type: 'string' },
  //                   },
  //                   {
  //                     name: 'last',
  //                     description: '',
  //                     typeDetails: { type: 'string' },
  //                   },
  //                 ],
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ];
  //     driver.when.mount({
  //       params,
  //       tableType: TableTypes.REQUEST,
  //     });

  //     expect(driver.count.oneOfLables()).toBe(2);
  //     expect(driver.count.rows()).toBe(4);
  //     expect(driver.get.nameAtRow(1)).toEqual('first name');
  //     expect(driver.get.nameAtRow(2)).toEqual('last name');
  //     expect(driver.get.nameAtRow(3)).toEqual('option a');
  //     expect(driver.get.nameAtRow(4)).toEqual('option b');
  //     await driver.click.expandAtRow(4);

  //     expect(driver.count.rows()).toBe(6);
  //     expect(driver.get.nameAtRow(5)).toEqual('first');
  //     expect(driver.get.nameAtRow(6)).toEqual('last');
  //   });
  // });

  // function randomMember(): Param {
  //   const rand = Math.random();
  //   return {
  //     name: `name_${rand}`,
  //     description: `description_${rand}`,
  //     typeDetails: {
  //       type: `type_${rand}`,
  //     },
  //   };
  // }

  // function getRandomData(length: number) {
  //   return new Array(length).fill({}).map(randomMember);
  // }

  it('Remove when ESM will work', () => {
    expect(true).toBeTruthy();
  });
});
