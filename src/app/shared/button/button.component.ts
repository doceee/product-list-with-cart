import { Component, HostBinding, Input } from '@angular/core';

const sizeNormal = 'px-4 py-2 text-sm';
const sizeSmall = 'px-2 py-1 text-sm';

type ButtonSize = 'normal' | 'small';

const twClasses = (
  size: ButtonSize,
  rounded = false,
  fullWidth = false
): string =>
  `${size === 'normal' ? sizeNormal : sizeSmall} ${
    rounded ? 'rounded-full' : 'rounded-md'
  } ${fullWidth ? 'w-full' : ''}`;

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  templateUrl: './button.component.html',
  host: {
    class:
      'items-center font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:ring-orange-500',
  },
})
export class ButtonComponent {
  @HostBinding('class')
  private twClasses = twClasses('normal');

  private _size: ButtonSize = 'normal';
  @Input()
  set size(value: ButtonSize) {
    this._size = value;
    this.twClasses = twClasses(this._size, this._rounded);
  }

  private _rounded: boolean = false;
  @Input()
  set rounded(value: boolean | undefined) {
    this._rounded = !!value;
    this.twClasses = twClasses(this._size, this._rounded);
  }

  private _fullWidth: boolean = false;
  @Input()
  set fullWidth(value: boolean | undefined) {
    this._fullWidth = !!value;
    this.twClasses = twClasses(this._size, this._rounded, this._fullWidth);
  }
}
