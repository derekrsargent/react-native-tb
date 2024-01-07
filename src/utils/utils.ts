import {Category, DiscountType} from '../types';
import {discounts} from '../data';

import type {Item} from '../types';

export const calculateAlcoholTax = (ordered: Item[]) => {
  let alcoholPrice = 0;
  ordered.forEach(item => {
    if (item.category === Category.Alcohol) {
      alcoholPrice += item.price;
    }
  });
  return alcoholPrice * 0.1;
};

export const calculateDiscounts = ({
  discountIds,
  total,
}: {
  discountIds: number[];
  total: number;
}) => {
  let discountedTotal = total;
  let totalDiscount = 0;

  if (!discountIds) {
    return 0;
  }

  discountIds.map(discountId => {
    if (discounts[discountId].type === DiscountType.Dollars) {
      totalDiscount += discounts[discountId].value;
      discountedTotal -= discounts[discountId].value;
    } else {
      totalDiscount += discountedTotal * discounts[discountId].value;
      discountedTotal -= discountedTotal * discounts[discountId].value;
    }
  });
  return Math.round(totalDiscount * 100) / 100;
};

export const calculateSubtotal = (ordered: Item[]) => {
  let subtotal = 0;
  ordered?.forEach(el => (subtotal += el.price));
  return subtotal;
};

export const calculateTax = (total: number) => {
  return Math.round(total * 0.13 * 100) / 100;
};

export const calculateTotal = ({
  discountIds,
  ordered,
}: {
  discountIds: number[];
  ordered: Item[];
}) => {
  const subtotal = calculateSubtotal(ordered);
  const total =
    subtotal + calculateTax(subtotal) + calculateAlcoholTax(ordered);
  return (
    Math.round((total - calculateDiscounts({total, discountIds})) * 100) / 100
  );
};

export const formatNumber = (number: number) =>
  `$${(Math.round(number * 100) / 100).toFixed(2)}`;
