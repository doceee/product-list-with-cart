import { Component, computed, inject, input } from '@angular/core';
import { Dessert } from './dessert';
import { CartService } from '../cart/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'dessert-item',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './dessert-item.component.html',
})
export class DessertItemComponent {
  dessert = input.required<Dessert>();
  private cartService = inject(CartService);

  quantity = computed(
    () =>
      this.cartService
        .cartItems()
        .find((item) => item.dessert.name === this.dessert().name)?.quantity ||
      0
  );

  onAdd() {
    this.cartService.addDessert(this.dessert());
  }

  onDelete() {
    this.cartService.removeDessert(this.dessert().name);
  }
}
