import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, BehaviorSubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CoinList, Currency, HistoricalData } from '../models/shared.interface';
import {
  HISTORICALAPI,
  ACCESSTOKEN,
  ACCESSTOKENBACKUP,
} from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';
  private readonly historicalBaseUrl = 'https://min-api.cryptocompare.com/';
  private readonly symbolUrl = 'https://data-api.cryptocompare.com';

  private currentAccessToken = ACCESSTOKEN;

  private readonly fiatSubject = new BehaviorSubject<Currency>({
    name: '',
    code: '',
  });
  private readonly searchingSubject = new BehaviorSubject<string>('');

  readonly fiat$ = this.fiatSubject.asObservable();
  readonly searching$ = this.searchingSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  sharedFiat(fiat: Currency): void {
    this.fiatSubject.next(fiat);
  }

  sharedSearch(query: string): void {
    this.searchingSubject.next(query);
  }

  getTrendingTop(
    currency: string,
    offset = 0,
    rows = 10,
    search = ''
  ): Observable<CoinList> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.currentAccessToken,
      },
    };

    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=${rows}&offset=${offset}&search=${search}`;

    return this.http.get<CoinList>(endpoint, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 429) {
          this.currentAccessToken = ACCESSTOKENBACKUP;
          options.headers['x-access-token'] = this.currentAccessToken;
          return this.http.get<CoinList>(endpoint, options);
        }
        return throwError(error);
      })
    );
  }

  getSymbol(symbol: string): Observable<string> {
    const endpoint = `${this.symbolUrl}/asset/v1/data/by/symbol?asset_symbol=${symbol}&api_key=${HISTORICALAPI}`;

    return this.http
      .get<any>(endpoint)
      .pipe(map((res: { Data: { LOGO_URL: string } }) => res.Data.LOGO_URL));
  }

  getCoinHistory(
    coin: string,
    period: string = 'day',
    currency = 'BRL'
  ): Observable<HistoricalData> {
    const endpoint = `${this.historicalBaseUrl}data/v2/histo${period}?fsym=${coin}&tsym=${currency}&limit=200&aggregate=2&aggregatePredictableTimePeriods=false&api_key=${HISTORICALAPI}`;
    return this.http.get<any>(endpoint).pipe(
      map((res) => {
        return {
          response: res.Response,
          data: res.Data.Data,
        };
      })
    );
  }
}
