import { Injectable, inject } from '@angular/core';

import { ApiEndpoints } from './utils/apiEndpoints';
import { ApiOptions } from './utils/apiOptions';
import { CoinList } from './interfaces/crypto-table.interface';
import { HistoricalData } from './interfaces/crypto-historical.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  http = inject(HttpClient);

  getTrendingTop(
    currency: string,
    offset = 0,
    rows = 10,
    search = '',
    favorites = ''
  ): Observable<CoinList> {
    const endpoint = ApiEndpoints.getTrendingTop(
      currency,
      offset,
      rows,
      search,
      favorites
    );
    return this.http.get<CoinList>(endpoint, ApiOptions.getDefaultOptions());
  }

  getSymbol(symbol: string): Observable<string> {
    const endpoint = ApiEndpoints.getSymbol(symbol);

    return this.http
      .get<any>(endpoint)
      .pipe(map((res: { Data: { LOGO_URL: string } }) => res.Data.LOGO_URL));
  }

  getDetails(uuid: string): Observable<any> {
    const endpoint = ApiEndpoints.getDetails(uuid);
    return this.http.get<any>(endpoint, ApiOptions.getDefaultOptions());
  }

  getCoinHistory(
    coin: string,
    period: string = 'day',
    currency = 'BRL'
  ): Observable<HistoricalData> {
    const endpoint = ApiEndpoints.getCoinHistory(coin, period, currency);
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
