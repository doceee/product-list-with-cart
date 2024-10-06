import { Component, inject, output } from '@angular/core';
import { CartService } from './cart.service';
import { ButtonComponent } from '../shared/button/button.component';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from './cart';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [ButtonComponent, CurrencyPipe],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  onModalOpen = output();
  private cartService = inject(CartService);

  cartCount = this.cartService.cartCount;
  cartItems = this.cartService.cartItems;
  totalPrice = this.cartService.total;

  onRemove(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.dessert.name);
  }
}
