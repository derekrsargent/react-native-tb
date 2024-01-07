import {data} from '../../data/data';
import {
  calculateAlcoholTax,
  calculateDiscounts,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from '../../utils/utils';

//const empty = [];

describe('utility functions', () => {
  test('alcohol tax calculation', () => {
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('discount calculation for $5.00', () => {
    expect(calculateDiscounts({subtotal: 100, discountIds: [0]})).toBe(5);
  });

  test('discount calculation for 20%', () => {
    expect(calculateDiscounts({subtotal: 100, discountIds: [1]})).toBe(20);
  });

  test('discount calculation for 10%', () => {
    expect(calculateDiscounts({subtotal: 100, discountIds: [2]})).toBe(10);
  });

  test('discount calculation with combination of $5.00 and 20%', () => {
    expect(calculateDiscounts({subtotal: 100, discountIds: [0, 1]})).toBe(24);
  });

  test('discount calculation with combination of all three discounts', () => {
    expect(calculateDiscounts({subtotal: 100, discountIds: [0, 1, 2]})).toBe(
      31.6,
    );
  });

  test('subtotal calculation', () => {
    expect(calculateSubtotal(data)).toBe(86.94);
  });

  test('tax calculation', () => {
    const subtotal = calculateSubtotal(data);
    expect(calculateTax(subtotal)).toBe(11.3);
  });

  test('total calculation with no discount', () => {
    expect(calculateTotal({subtotal: 100, discountIds: []})).toBe(113);
  });

  test('total calculation with a discount', () => {
    expect(calculateTotal({subtotal: 200, discountIds: [0]})).toBe(221);
  });
});
