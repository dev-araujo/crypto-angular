import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'coinPrice', standalone: true })
export class CoinPricePipe implements PipeTransform {
  transform(value: number, currencySymbol: string, noData: string): string {
    if (value) {
      const currencyCode = currencySymbol === 'R$' ? 'BRL' : 'USD';
      const locale = currencySymbol === 'R$' ? 'pt-BR' : 'en-US';
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 2,
        maximumFractionDigits: 8,
      }).format(value);
    } else {
      return noData;
    }
  }
}
