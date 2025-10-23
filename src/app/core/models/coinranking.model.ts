export interface CoinrankingStats {
  total: number;
  totalCoins: number;
  totalMarkets: number;
  totalExchanges: number;
  totalMarketCap: string;
  total24hVolume: string;
}

export interface CoinrankingCoin {
  uuid: string;
  symbol: string;
  name: string;
  color: string | null;
  iconUrl: string;
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string; 
  rank: number;
  sparkline: (string | null)[]; 
  coinrankingUrl: string;
  '24hVolume': string;
  lowVolume?: boolean; 
  favorite?: boolean;
}

export interface CoinrankingApiResponse {
  status: string;
  data: {
    stats: CoinrankingStats;
    coins: CoinrankingCoin[];
  };
}

export interface Currency {
  uuid: string; 
  type: string;
  iconUrl: string;
  name: string;
  symbol: string;
  sign: string; 
}