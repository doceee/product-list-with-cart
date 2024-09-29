import { type Recipe } from '../recipe-item/recipe';

export interface CartItem {
  recipe: Recipe;
  quantity: number;
}
