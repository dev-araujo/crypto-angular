import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ACCESSTOKEN } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';

  constructor(private http: HttpClient) {}

  getTrendingTop(currency: string): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': ACCESSTOKEN,
      },
    };

    // n5fpnvMGNsOS = BRL
    // 'yhjMzLPhuIDl' usd
    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=6`;
    return this.http.get<any>(endpoint, options);
  }
}
