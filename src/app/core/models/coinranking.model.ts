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

export interface CoinrankingLink {
  name: string;
  type: string;
  url: string;
}

export interface CoinrankingCoinDetail {
  uuid: string;
  symbol: string;
  name: string;
  description: string;
  color: string | null;
  iconUrl: string;
  websiteUrl: string;
  links: CoinrankingLink[];
  marketCap: string;
  price: string;
  btcPrice: string;
  listedAt: number;
  change: string;
  rank: number;
  '24hVolume': string;
  allTimeHigh: {
    price: string;
    timestamp: number;
  };
  supply: {
    confirmed: boolean;
    supplyAt: number;
    max: string;
    total: string;
    circulating: string;
  };
}

export interface CoinrankingCoinDetailResponse {
  status: string;
  data: {
    coin: CoinrankingCoinDetail;
  };
}

export interface CoinrankingHistoryData {
  price: string;
  timestamp: number;
}

export interface CoinrankingHistory {
  change: string;
  history: CoinrankingHistoryData[];
}

export interface CoinrankingCoinHistoryResponse {
  status: string;
  data: CoinrankingHistory;
}