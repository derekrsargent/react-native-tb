enum Category {
  'Appetizers',
  'Mains',
  'Drinks',
  'Alcohol',
}

enum DiscountType {
  'Dollars',
  'Percentage',
}

export type Item = {
  id: number;
  name: string;
  category: Category;
  price: number;
};

export type Discount = {
  id: number;
  name: string;
  value: number;
  type: DiscountType;
};

export const data: Item[] = [
  {id: 0, name: 'Nachos', category: Category.Appetizers, price: 13.99},
  {id: 1, name: 'Calamari', category: Category.Appetizers, price: 11.99},
  {id: 2, name: 'Caesar Salad', category: Category.Appetizers, price: 10.99},
  {id: 3, name: 'Burger', category: Category.Mains, price: 9.99},
  {id: 4, name: 'Hotdog', category: Category.Mains, price: 3.99},
  {id: 5, name: 'Pizza', category: Category.Mains, price: 12.99},
  {id: 6, name: 'Water', category: Category.Drinks, price: 0.0},
  {id: 7, name: 'Pop', category: Category.Drinks, price: 2.0},
  {id: 8, name: 'Orange Juice', category: Category.Drinks, price: 3.0},
  {id: 9, name: 'Beer', category: Category.Alcohol, price: 5.0},
  {id: 10, name: 'Cider', category: Category.Alcohol, price: 6.0},
  {id: 11, name: 'Wine', category: Category.Alcohol, price: 7.0},
];

export const discounts: Discount[] = [
  {id: 0, name: '10%', value: 0.1, type: DiscountType.Percentage},
  {id: 1, name: '20%', value: 0.2, type: DiscountType.Percentage},
  {id: 2, name: '$5.00', value: 5, type: DiscountType.Dollars},
];
