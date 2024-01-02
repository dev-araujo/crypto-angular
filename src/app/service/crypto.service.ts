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

import {
  ACCESSTOKEN,
  ACCESSTOKENBACKUP,
  HISTORICALAPI,
} from '../../../config/config';
import { CoinList, Currency } from '../models/shared.interface';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';
  private readonly hitoricalBaseUrl =
    'https://min-api.cryptocompare.com/data/v2/';
  private currentAccessToken = ACCESSTOKEN;
  private fiatSubject = new BehaviorSubject<Currency>({ name: '', code: '' });
  private searchingSubject = new BehaviorSubject<string>('');

  fiat$ = this.fiatSubject.asObservable();
  searching$ = this.searchingSubject.asObservable();

  constructor(private http: HttpClient) {}

  sharedFiat(changeFiat: Currency) {
    this.fiatSubject.next(changeFiat);
  }

  sharedSearch(find: string) {
    this.searchingSubject.next(find);
  }

  getTrendingTop(
    currency: string,
    offset: number = 0,
    rows = 10,
    search = ''
  ): Observable<CoinList | any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.currentAccessToken,
      },
    };
    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=${rows}&offset=${offset}&search=${search}`;

    return this.http.get<CoinList | any>(endpoint, options);
    // .pipe(
    //   catchError((error) => {
    //     if (error instanceof HttpErrorResponse && error.status === 429) {
    //       this.currentAccessToken = ACCESSTOKENBACKUP;
    //       options.headers['x-access-token'] = this.currentAccessToken;
    //       return this.http.get<CoinList | any>(endpoint, options);
    //     }
    //     return throwError(error);
    //   })
    // );
  }

  getCoinHistory(coin: string, period: string = 'day', currency = 'BRL'): any {
    const endpoint = `${this.hitoricalBaseUrl}histo${period}?fsym=${coin}&tsym=${currency}&limit=500&api_key=${this.hitoricalBaseUrl}`;

    return this.http.get<any>(endpoint);
  }
}
