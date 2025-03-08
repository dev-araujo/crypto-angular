import { CoinList, HistoricalData } from '../../models/shared.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICryptoApiService } from '../../models/crypto-api.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService implements ICryptoApiService {
  private readonly _apiUrl = environment.url.baseUrl;
  private readonly _apiHistorial = environment.url.historicalBaseUrl;
  private readonly _apiSymbol = environment.url.symbolUrl;
  private readonly _currentAccessToken = environment.tokens.ACCESSTOKEN;
  private readonly _historicalAccessToken = environment.tokens.HISTORICALAPI;

  http = inject(HttpClient);

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
        'x-access-token': this._currentAccessToken,
      },
    };
    const endpoint = `${this._apiUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=${rows}&offset=${offset}&search=${search}&${favorites}`;
    return this.http.get<CoinList>(endpoint, options);
  }

  getSymbol(symbol: string): Observable<string> {
    const endpoint = `${this._apiSymbol}/asset/v1/data/by/symbol?asset_symbol=${symbol}&api_key=${this._historicalAccessToken}`;

    return this.http
      .get<any>(endpoint)
      .pipe(map((res: { Data: { LOGO_URL: string } }) => res.Data.LOGO_URL));
  }

  getDetails(uuid: string): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this._currentAccessToken,
      },
    };
    const endpoint = `${this._apiUrl}coin/${uuid}`;

    return this.http.get<any>(endpoint, options);
  }

  getCoinHistory(
    coin: string,
    period: string = 'day',
    currency = 'BRL'
  ): Observable<HistoricalData> {
    const endpoint = `${this._apiHistorial}data/v2/histo${period}?fsym=${coin}&tsym=${currency}&limit=200&aggregate=2&aggregatePredictableTimePeriods=false&api_key=${this._historicalAccessToken}`;
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
