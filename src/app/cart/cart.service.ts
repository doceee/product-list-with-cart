import { computed, Injectable, signal } from '@angular/core';
import { type CartItem } from './cart';
import { Recipe } from '../recipe-item/recipe';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() =>
    this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0)
  );
  total = computed(() =>
    this.cartItems().reduce(
      (accQty, item) => accQty + item.recipe.price * item.quantity,
      0
    )
  );

  removeCartItem(name: string) {
    this.cartItems.update((data) =>
      data.filter((item) => item.recipe.name !== name)
    );
  }

  removeRecipe(name: string) {
    const itemIndex = this.cartItems().findIndex(
      (item) => item.recipe.name === name
    );

    if (itemIndex < 0) {
      return;
    }

    if (this.cartItems()[itemIndex].quantity === 1) {
      this.cartItems.update((data) =>
        data.filter((item) => item.recipe.name !== name)
      );

      return;
    }

    this.cartItems.update((data) =>
      data.map((item) =>
        item.recipe.name === name
          ? { recipe: item.recipe, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  addRecipe(recipe: Recipe) {
    if (!this.cartItems().some((item) => item.recipe.name === recipe.name)) {
      this.cartItems.set([...this.cartItems(), { recipe, quantity: 1 }]);

      return;
    }

    this.cartItems.update((data) =>
      data.map((item) =>
        item.recipe.name === recipe.name
          ? { recipe: item.recipe, quantity: item.quantity + 1 }
          : item
      )
    );
  }
}
