import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lowVolume', standalone: true })
export class LowVolumePipe implements PipeTransform {
  transform(isLow: boolean): string {
    return isLow ? '😭 Sim' : '🤑 Não';
  }
}
