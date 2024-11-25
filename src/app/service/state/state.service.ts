import { BehaviorSubject } from 'rxjs';
import { Currency } from '../../models/shared.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly fiatSubject = new BehaviorSubject<Currency>({
    name: '',
    code: '',
  });
  private readonly searchingSubject = new BehaviorSubject<string>('');
  private readonly connectionSubject = new BehaviorSubject<boolean>(false);
  private readonly favoritesSubject = new BehaviorSubject<boolean>(false);

  readonly fiat$ = this.fiatSubject.asObservable();
  readonly searching$ = this.searchingSubject.asObservable();
  readonly connection$ = this.connectionSubject.asObservable();
  readonly favorites$ = this.favoritesSubject.asObservable();

  sharedFiat(fiat: Currency): void {
    this.fiatSubject.next(fiat);
  }

  sharedFavoritesClicked(clicked: boolean): void {
    this.favoritesSubject.next(clicked);
  }

  sharedSearch(query: string): void {
    this.searchingSubject.next(query);
  }

  sharedWalletClick(connect: boolean): void {
    this.connectionSubject.next(connect);
  }
}
