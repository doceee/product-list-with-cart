import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe-item/recipe';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { CartService } from './cart/cart.service';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipeItemComponent, CartComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  recipes = signal<Recipe[] | undefined>(undefined);
  isFetching = signal(false);

  private recipesService = inject(RecipesService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  cartCount = this.cartService.cartCount;

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.recipesService.loadRecipes().subscribe({
      next: (recipes) => {
        this.recipes.set(recipes);
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
