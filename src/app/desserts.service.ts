import { inject, Injectable } from '@angular/core';
import { Dessert } from './dessert-item/dessert';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DessertsService {
  private httpClient = inject(HttpClient);

  loadDesserts() {
    return this.httpClient.get<Dessert[]>('/data.json').pipe(
      catchError((error) => {
        console.error(error);
        return throwError(() => new Error(error));
      })
    );
  }
}
