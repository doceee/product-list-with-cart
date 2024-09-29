import { inject, Injectable } from '@angular/core';
import { Recipe } from './recipe-item/recipe';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipesService {
  private httpClient = inject(HttpClient);

  loadRecipes() {
    return this.httpClient.get<Recipe[]>('/data.json').pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      })
    );
  }
}
