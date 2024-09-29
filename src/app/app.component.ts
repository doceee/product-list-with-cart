import { Component, DestroyRef, inject, signal } from '@angular/core';
import { DessertsService } from './desserts.service';
import { Dessert } from './dessert-item/dessert';
import { DessertItemComponent } from './dessert-item/dessert-item.component';
import { CartService } from './cart/cart.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DessertItemComponent, CartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  desserts = signal<Dessert[] | undefined>(undefined);
  isFetching = signal(false);

  private dessertsService = inject(DessertsService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartCount = this.cartService.cartCount;

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.dessertsService.loadDesserts().subscribe({
      next: (desserts) => {
        this.desserts.set(desserts);
      },
      error: (err: Error) => {
        console.error(err);
      },
      complete: () => this.isFetching.set(false),
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
