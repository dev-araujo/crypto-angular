export interface Currency {
  name: string;
  code: string;
}

// api return
export interface CoinList {
  status: string;
  data: Data;
}

export interface Data {
  stats: Stats;
  coins: Coin[];
}

export interface Stats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}

export interface Coin {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
  sparkline: string[];
  coinrankingUrl: string;
  '24hVolume': string;
}

// historicalBaseUrl

export interface HistoricalData {
  response: string;
  data: HistoricalObj[];
}
export interface HistoricalObj {
  time: number;
  high: number;
  low: number;
  open: number;
  volumefrom: number;
  volumeto: number;
  close: number | any;
  conversionType: string;
  conversionSymbol: string;
}
