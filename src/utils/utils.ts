import {Category} from '../data/data';

import type {Item} from '../data/data';

export const calculateAlcoholTax = (ordered: Item[]) => {
  let alcoholPrice = 0;
  ordered.forEach(item => {
    if (item.category === Category.Alcohol) {
      alcoholPrice += item.price;
    }
  });
  return alcoholPrice * 0.1;
};

export const calculateDiscounts = (subtotal: number) => {
  return subtotal * 0.2;
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
  discount,
  subtotal,
  tax,
}: {
  discount: number;
  subtotal: number;
  tax: number;
}) => {
  return subtotal + tax - discount;
};
