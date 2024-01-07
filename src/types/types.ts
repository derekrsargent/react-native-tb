import {RouteProp} from '@react-navigation/native';

export enum Category {
  'Appetizers',
  'Mains',
  'Drinks',
  'Alcohol',
}

export enum DiscountType {
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

export type RootStackParamList = {
  Discounts: {discountIds: number[]};
  Main: {discountIds: number[]};
};

export type MainScreenProps = {
  route: RouteProp<RootStackParamList, 'Main'>;
};

export type DiscountsScreenProps = {
  route: RouteProp<RootStackParamList, 'Discounts'>;
};
