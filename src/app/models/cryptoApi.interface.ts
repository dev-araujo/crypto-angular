import { Observable } from 'rxjs';
import { CoinList, HistoricalData } from './shared.interface';

export interface ICryptoApiService {
  getTrendingTop(
    currency: string,
    offset?: number,
    rows?: number,
    search?: string
  ): Observable<CoinList>;

  getSymbol(symbol: string): Observable<string>;

  getCoinHistory(
    coin: string,
    period?: string,
    currency?: string
  ): Observable<HistoricalData>;
}
