import {Category, DiscountType} from '../types/types';

import type {Discount, Item} from '../types/types';

export const data: Item[] = [
  {id: 0, name: 'Nachos', category: Category.Appetizers, price: 13.99},
  {id: 1, name: 'Calamari', category: Category.Appetizers, price: 11.99},
  {id: 2, name: 'Caesar Salad', category: Category.Appetizers, price: 10.99},
  {id: 3, name: 'Burger', category: Category.Mains, price: 9.99},
  {id: 4, name: 'Hotdog', category: Category.Mains, price: 3.99},
  {id: 5, name: 'Pizza', category: Category.Mains, price: 12.99},
  {id: 6, name: 'Water', category: Category.Drinks, price: 0},
  {id: 7, name: 'Pop', category: Category.Drinks, price: 2},
  {id: 8, name: 'Orange Juice', category: Category.Drinks, price: 3},
  {id: 9, name: 'Beer', category: Category.Alcohol, price: 5},
  {id: 10, name: 'Cider', category: Category.Alcohol, price: 6},
  {id: 11, name: 'Wine', category: Category.Alcohol, price: 7},
];

export const discounts: Discount[] = [
  {id: 0, name: '$5.00 off', value: 5, type: DiscountType.Dollars},
  {id: 1, name: '20% off', value: 0.2, type: DiscountType.Percentage},
  {id: 2, name: '10% off', value: 0.1, type: DiscountType.Percentage},
];
