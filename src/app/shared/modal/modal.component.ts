import {
  Component,
  ElementRef,
  Input,
  input,
  OnDestroy,
  OnInit,
  output,
  Renderer2,
} from '@angular/core';
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
  enableCloseOutside = input(true);

  private _to = '';
  @Input()
  set to(value: string) {
    this._to = value;
  }

  ngOnInit() {
    if (!this._to) return;

    let teleportTo;

    try {
      teleportTo = this.renderer.selectRootElement(this._to, true);
    } catch (error) {
      console.error(
        `Couldn't find DOM Element with specified name: '${this._to}'`
      );
      this._to = 'body';

      teleportTo = this.renderer.selectRootElement(this._to, true);
    }

    this.renderer.appendChild(teleportTo, this.el.nativeElement);
  }

  ngOnDestroy() {
    if (!this._to || !document.body.contains(this.el.nativeElement)) {
      return;
    }

    const teleportTo = this.renderer.selectRootElement(this._to, true);
    this.renderer.removeChild(teleportTo, this.el.nativeElement);
  }

  closeModal() {
    if (!this.enableCloseOutside()) return;

    this.onModalClose.emit();
  }
}
