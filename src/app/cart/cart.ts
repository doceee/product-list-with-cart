import { type Dessert } from '../dessert-item/dessert';

export interface CartItem {
  dessert: Dessert;
  quantity: number;
}
