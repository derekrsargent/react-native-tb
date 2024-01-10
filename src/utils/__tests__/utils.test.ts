import {data} from '../../data';
import {
  calculateAlcoholTax,
  calculateDiscounts,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatNumber,
} from '../../utils';

describe('utility functions', () => {
  test('alcohol tax calculation', () => {
    expect(calculateAlcoholTax(data)).toBe(1.8);
  });

  test('discount calculation for $5.00', () => {
    expect(calculateDiscounts({maximumDiscount: 100, discountIds: [0]})).toBe(
      5,
    );
  });

  test('discount calculation for 20%', () => {
    expect(calculateDiscounts({maximumDiscount: 100, discountIds: [1]})).toBe(
      20,
    );
  });

  test('discount calculation for 10%', () => {
    expect(calculateDiscounts({maximumDiscount: 100, discountIds: [2]})).toBe(
      10,
    );
  });

  test('discount calculation with combination of $5.00 and 20%', () => {
    expect(
      calculateDiscounts({maximumDiscount: 100, discountIds: [0, 1]}),
    ).toBe(24);
  });

  test('discount calculation with combination of all three discounts', () => {
    expect(
      calculateDiscounts({maximumDiscount: 100, discountIds: [0, 1, 2]}),
    ).toBe(31.6);
  });

  test('discount calculation where the total is $0.00', () => {
    expect(calculateDiscounts({maximumDiscount: 0, discountIds: [0, 1]})).toBe(
      0,
    );
  });

  test('discount calculation where the total is less than the $5.00 discount', () => {
    expect(calculateDiscounts({maximumDiscount: 2.26, discountIds: [0]})).toBe(
      2.26,
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
    expect(calculateTotal({discountIds: [], ordered: data})).toBe(100.04);
  });

  test('total calculation with a discount', () => {
    expect(calculateTotal({discountIds: [0], ordered: data})).toBe(95.04);
  });

  test('total calculation with all discounts', () => {
    expect(calculateTotal({discountIds: [0, 1, 2], ordered: data})).toBe(68.43);
  });

  test('total calculation when total is $0 with a $5 discount', () => {
    expect(calculateTotal({discountIds: [0], ordered: []})).toBe(0);
  });

  test('formatting of number into string in dollar format', () => {
    expect(formatNumber(12.345)).toBe('$12.35');
  });

  test('formatting of zero into string in dollar format', () => {
    expect(formatNumber(0)).toBe('$0.00');
  });
});
