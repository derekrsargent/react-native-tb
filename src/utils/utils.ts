import {Category, DiscountType} from '../types/types';
import {discounts} from '../data/data';

import type {Item} from '../types/types';

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
  subtotal,
  discountIds,
}: {
  subtotal: number;
  discountIds: number[];
}) => {
  let discountedSubtotal = subtotal;
  let totalDiscount = 0;

  if (!discountIds) {
    return 0;
  }

  discountIds.map(discountId => {
    if (discounts[discountId].type === DiscountType.Dollars) {
      totalDiscount += discounts[discountId].value;
      discountedSubtotal -= discounts[discountId].value;
      console.log(discountedSubtotal);
    } else {
      totalDiscount += discountedSubtotal * discounts[discountId].value;
      discountedSubtotal -= discountedSubtotal * discounts[discountId].value;
      console.log(discountedSubtotal);
    }
  });
  return Math.round(totalDiscount * 100) / 100;
};

export const calculateSubtotal = (ordered: Item[]) => {
  let subtotal = 0;
  ordered?.forEach(el => (subtotal += el.price));
  return subtotal;
};

export const calculateTax = (subtotal: number) => {
  return Math.round(subtotal * 0.13 * 100) / 100;
};

export const calculateTotal = ({
  discountIds,
  subtotal,
}: {
  discountIds: number[];
  subtotal: number;
}) => {
  return (
    subtotal +
    calculateTax(subtotal) -
    calculateDiscounts({subtotal, discountIds})
  );
};
