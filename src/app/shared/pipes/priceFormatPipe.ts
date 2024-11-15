import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceFormat',
  standalone: true,
})
export class PriceFormatPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    currencySymbol: string = '$',
    format: string = 'symbol',
    digitsInfo: string = '1.8-8',
    fallback: string = '-'
  ): string {
    if (value == null || isNaN(value)) {
      return fallback;
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencySymbol,
      minimumFractionDigits: parseInt(digitsInfo.split('-')[0], 10),
      maximumFractionDigits: parseInt(digitsInfo.split('-')[1], 10),
    }).format(value);
  }
}
