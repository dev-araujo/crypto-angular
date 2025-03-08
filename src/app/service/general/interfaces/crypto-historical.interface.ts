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
