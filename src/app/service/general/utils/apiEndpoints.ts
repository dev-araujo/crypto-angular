import { environment } from '../../../../environments/environment';

export class ApiEndpoints {
  private static readonly baseUrl = environment.url.baseUrl;
  private static readonly historicalBaseUrl = environment.url.historicalBaseUrl;
  private static readonly symbolUrl = environment.url.symbolUrl;
  private static readonly historicalAccessToken =
    environment.tokens.HISTORICALAPI;

  static getTrendingTop(
    currency: string,
    offset = 0,
    rows = 10,
    search = '',
    favorites = ''
  ): string {
    return `${this.baseUrl}coins?referenceCurrencyUuid=${currency}&orderBy=price&limit=${rows}&offset=${offset}&search=${search}&${favorites}`;
  }

  static getSymbol(symbol: string): string {
    return `${this.symbolUrl}/asset/v1/data/by/symbol?asset_symbol=${symbol}&api_key=${this.historicalAccessToken}`;
  }

  static getDetails(uuid: string): string {
    return `${this.baseUrl}coin/${uuid}`;
  }

  static getCoinHistory(
    coin: string,
    period: string = 'day',
    currency = 'BRL'
  ): string {
    return `${this.historicalBaseUrl}data/v2/histo${period}?fsym=${coin}&tsym=${currency}&limit=200&aggregate=2&aggregatePredictableTimePeriods=false&api_key=${this.historicalAccessToken}`;
  }
}
