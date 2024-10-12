import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../cart/cart';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [ButtonComponent, ModalComponent, CurrencyPipe],
  templateUrl: './confirm-dialog.component.html',
  host: { class: 'fixed flex items-center justify-center' },
})
export class ConfirmDialogComponent {
  onModalClose = output();
  onSubmit = output();

  open = input.required<boolean>();
  cart = input.required<CartItem[]>();
  total = input.required<number>();
}
