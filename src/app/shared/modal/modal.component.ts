import {
  Component,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
import { CartItem } from '../../cart/cart';
import { ButtonComponent } from '../../shared/button/button.component';
import { CurrencyPipe } from '@angular/common';
import { ClickOutsideDirective } from '../directives/click-outside.directive';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  imports: [CurrencyPipe, ButtonComponent, ClickOutsideDirective],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  onModalClose = output();
  onModalSubmit = output();

  open = input.required<boolean>();
  cart = input.required<CartItem[]>();
  total = input.required<number>();

  ngOnInit() {
    const body = this.renderer.selectRootElement('body', true);
    this.renderer.appendChild(body, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (!document.body.contains(this.el.nativeElement)) {
      return;
    }

    const body = this.renderer.selectRootElement('body', true);
    this.renderer.removeChild(body, this.el.nativeElement);
  }

  closeModal() {
    this.onModalClose.emit();
  }

  submitModal() {
    this.onModalSubmit.emit();
  }
}
