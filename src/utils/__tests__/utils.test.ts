import {data} from '../../data/data';
import {
  calculateAlcoholTax,
  //calculateDiscounts,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from '../../utils/utils';

//const empty = [];

describe('utility functions', () => {
  test('alcohol tax calculation', () => {
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('discount calculation for 10%', () => {
    //TODO
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('discount calculation for 20%', () => {
    //TODO
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('discount calculation for $5.00', () => {
    //TODO
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('subtotal calculation', () => {
    expect(calculateSubtotal(data)).toBe(86.94);
  });

  test('tax calculation', () => {
    const subtotal = calculateSubtotal(data);
    expect(calculateTax(subtotal)).toBe(11.3);
  });

  test('total calculation with no discount', () => {
    expect(calculateTotal({subtotal: 100, tax: 13, discount: 0})).toBe(113);
  });

  test('total calculation with a discount', () => {
    expect(calculateTotal({subtotal: 200, tax: 26, discount: 10})).toBe(216);
  });
});
