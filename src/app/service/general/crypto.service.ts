import {
  ACCESSTOKEN,
  ACCESSTOKENBACKUP,
  HISTORICALAPI,
} from '../../../../config/config';
import { CoinList, HistoricalData } from '../../models/shared.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICryptoApiService } from '../../models/crypto-api.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements ICryptoApiService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';
  private readonly historicalBaseUrl = 'https://min-api.cryptocompare.com/';
  private readonly symbolUrl = 'https://data-api.cryptocompare.com';

  private currentAccessToken = ACCESSTOKEN;

  constructor(private readonly http: HttpClient) {}

  getTrendingTop(
    currency: string,
    offset = 0,
    rows = 10,
    search = '',
    favorites = ''
  ): Observable<CoinList> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.currentAccessToken,
      },
    };

    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=${rows}&offset=${offset}&search=${search}&${favorites}`;

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

  getDetails(uuid: string): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.currentAccessToken,
      },
    };
    const endpoint = `${this.baseUrl}coin/${uuid}`;

    return this.http.get<any>(endpoint, options);
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
