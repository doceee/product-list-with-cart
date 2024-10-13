import { Component, inject, output } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { CurrencyPipe } from '@angular/common';
import { ClickOutsideDirective } from '../shared/directives/click-outside.directive';
import { ModalComponent } from '../shared/modal/modal.component';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  imports: [
    CurrencyPipe,
    ButtonComponent,
    ClickOutsideDirective,
    ModalComponent,
  ],
})
export class ConfirmDialogComponent {
  onModalClose = output();
  onModalSubmit = output();

  private cartService = inject(CartService);
  cart = this.cartService.cartItems;
  total = this.cartService.total;

  closeModal() {
    this.onModalClose.emit();
  }

  submitModal(event: Event) {
    event.stopPropagation();
    this.onModalSubmit.emit();
  }
}
