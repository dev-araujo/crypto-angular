import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject, switchMap, catchError, of, tap, combineLatest } from 'rxjs';
import { CoinrankingApiResponse, CoinrankingStats } from '../models/coinranking.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.url.baseUrl;
  private readonly apiKey = environment.tokens.ACCESSTOKEN;

  private currencyUuid$ = new BehaviorSubject<string>('n5fpnvMGNsOS');
  public currencyCode$ = new BehaviorSubject<string>('BRL');
  private searchTerm$ = new BehaviorSubject<string>('');

  public offset$ = new BehaviorSubject<number>(0);

  public limit$ = new BehaviorSubject<number>(10);

  public loading$ = new BehaviorSubject<boolean>(true);
  public error$ = new BehaviorSubject<string | null>(null);
  public totalRecords$ = new BehaviorSubject<number>(0);

  public coins$: Observable<CoinrankingApiResponse> = combineLatest([
    this.currencyUuid$,
    this.searchTerm$,
    this.offset$,
    this.limit$,
  ]).pipe(
    tap(() => this.loading$.next(true)),
    switchMap(([currencyUuid, searchTerm, offset, limit]) =>
      this.fetchCoins(currencyUuid, offset, limit, searchTerm)
    ),
    tap((response) => {
      if (response && response.status === 'success' && response.data.stats) {
        this.totalRecords$.next(Number(response.data.stats.total));
      }
      this.loading$.next(false);
    })
  );

  private fetchCoins(
    currencyUuid: string,
    offset: number,
    limit: number,
    searchTerm: string
  ): Observable<CoinrankingApiResponse> {
    let params = new HttpParams()
      .set('referenceCurrencyUuid', currencyUuid)
      .set('limit', limit.toString())
      .set('offset', offset.toString())
      .set('orderBy', 'marketCap')
      .set('orderDirection', 'desc');

    if (searchTerm) {
      params = params.set('search', searchTerm);
    }

    const headers = new HttpHeaders({
      'x-access-token': this.apiKey,
    });

    const endpoint = `${this.baseUrl}coins`;

    return this.http.get<CoinrankingApiResponse>(endpoint, { headers, params }).pipe(
      catchError((err) => {
        this.error$.next('Failed to load cryptocurrency data.');
        const emptyStats = { total: 0 } as Partial<CoinrankingStats>;
        return of({
          status: 'error',
          data: { stats: emptyStats as CoinrankingStats, coins: [] },
        } as CoinrankingApiResponse);
      }),
      tap((response) => {
        if (response.status === 'success') {
          this.error$.next(null);
        }
      })
    );
  }

  public setCurrency(code: string, uuid: string): void {
    this.currencyCode$.next(code);
    this.currencyUuid$.next(uuid);
    this.offset$.next(0);
  }

  public setSearchTerm(term: string): void {
    this.searchTerm$.next(term);
    this.offset$.next(0);
  }

  public setPage(offset: number): void {
    this.offset$.next(offset);
  }

  public setLimit(limit: number): void {
    this.limit$.next(limit);
    this.offset$.next(0);
  }
}
