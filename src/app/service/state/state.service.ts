import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Currency } from '../../models/shared.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  private readonly fiatSubject = new BehaviorSubject<Currency>({
    name: '',
    code: '',
  });
  private readonly searchingSubject = new BehaviorSubject<string>('');

  readonly fiat$ = this.fiatSubject.asObservable();
  readonly searching$ = this.searchingSubject.asObservable();

  sharedFiat(fiat: Currency): void {
    this.fiatSubject.next(fiat);
  }

  sharedSearch(query: string): void {
    this.searchingSubject.next(query);
  }
}
