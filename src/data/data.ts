enum Category {
  'Appetizers',
  'Mains',
  'Drinks',
  'Alcohol',
}

type Data = {
  name: string;
  category: Category;
  price: number;
};

export const data: Data[] = [
  {name: 'Nachos', category: Category.Appetizers, price: 13.99},
  {name: 'Calamari', category: Category.Appetizers, price: 11.99},
  {name: 'Caesar Salad', category: Category.Appetizers, price: 10.99},
  {name: 'Burger', category: Category.Mains, price: 9.99},
  {name: 'Hotdog', category: Category.Mains, price: 3.99},
  {name: 'Pizza', category: Category.Mains, price: 12.99},
  {name: 'Water', category: Category.Drinks, price: 0.0},
  {name: 'Pop', category: Category.Drinks, price: 2.0},
  {name: 'Orange Juice', category: Category.Drinks, price: 3.0},
  {name: 'Beer', category: Category.Alcohol, price: 5.0},
  {name: 'Cider', category: Category.Alcohol, price: 6.0},
  {name: 'Wine', category: Category.Alcohol, price: 7.0},
];
