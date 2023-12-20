import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  switchMap,
  throwError,
} from 'rxjs';

import { ACCESSTOKEN, ACCESSTOKENBACKUP } from '../../../config/config';
import { CoinList, Currency } from '../models/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';
  private currentAccessToken = ACCESSTOKEN;
  private fiatSubject = new BehaviorSubject<Currency>({ name: '', code: '' });

  fiat$ = this.fiatSubject.asObservable();

  constructor(private http: HttpClient) {}

  sharedFiat(changeFiat: Currency) {
    this.fiatSubject.next(changeFiat);
  }

  getTrendingTop(
    currency: string,
    offset: number = 0
  ): Observable<CoinList | any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.currentAccessToken,
      },
    };
    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=10&offset=${offset}`;
    return this.http.get<CoinList | any>(endpoint, options).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 429) {
          this.currentAccessToken = ACCESSTOKENBACKUP;
          options.headers['x-access-token'] = this.currentAccessToken;
          return this.http.get<CoinList | any>(endpoint, options);
        }
        return throwError(error);
      })
    );
  }
}
