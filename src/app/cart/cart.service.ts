import { computed, Injectable, signal } from '@angular/core';
import { type CartItem } from './cart';
import { Dessert } from '../dessert-item/dessert';

@Injectable({ providedIn: 'root' })
export class CartService {
  cartItems = signal<CartItem[]>([]);
  cartCount = computed(() =>
    this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0)
  );
  total = computed(() =>
    this.cartItems().reduce(
      (accQty, item) => accQty + item.dessert.price * item.quantity,
      0
    )
  );

  reset() {
    this.cartItems.set([]);
  }

  removeCartItem(name: string) {
    this.cartItems.update((data) =>
      data.filter((item) => item.dessert.name !== name)
    );
  }

  removeDessert(name: string) {
    const itemIndex = this.cartItems().findIndex(
      (item) => item.dessert.name === name
    );

    if (itemIndex < 0) {
      return;
    }

    if (this.cartItems()[itemIndex].quantity === 1) {
      this.cartItems.update((data) =>
        data.filter((item) => item.dessert.name !== name)
      );

      return;
    }

    this.cartItems.update((data) =>
      data.map((item) =>
        item.dessert.name === name
          ? { dessert: item.dessert, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  addDessert(dessert: Dessert) {
    if (!this.cartItems().some((item) => item.dessert.name === dessert.name)) {
      this.cartItems.set([...this.cartItems(), { dessert, quantity: 1 }]);

      return;
    }

    this.cartItems.update((data) =>
      data.map((item) =>
        item.dessert.name === dessert.name
          ? { dessert: item.dessert, quantity: item.quantity + 1 }
          : item
      )
    );
  }
}
