import { Component, computed, inject, input } from '@angular/core';
import { Recipe } from './recipe';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'recipe-item',
  standalone: true,
  templateUrl: './recipe-item.component.html',
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();
  private cartService = inject(CartService);

  isAdded = computed(() =>
    this.cartService
      .cartItems()
      .some(
        (item) => item.recipe.name === this.recipe().name && item.quantity > 0
      )
  );

  onAdd() {
    this.cartService.addRecipe(this.recipe());
  }

  onDelete() {
    this.cartService.removeRecipe(this.recipe().name);
  }
}
