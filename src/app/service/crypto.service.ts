import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ACCESSTOKEN } from '../../../config/config';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly baseUrl = 'https://api.coinranking.com/v2/';

  constructor(private http: HttpClient) {}

  private fiatSubject = new BehaviorSubject<string>('n5fpnvMGNsOS');
  fiat$ = this.fiatSubject.asObservable();

  sharedFiat(changeFiat: any) {
    this.fiatSubject.next(changeFiat);
  }

  getTrendingTop(currency: string, offset: number = 0): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': ACCESSTOKEN,
      },
    };
    const endpoint = `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=10&offset=${offset}`;
    return this.http.get<any>(endpoint, options);
  }
}
