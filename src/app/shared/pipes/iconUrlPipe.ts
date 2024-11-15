import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'iconUrl', standalone: true })
export class IconUrlPipe implements PipeTransform {
  transform(iconUrl: string): string {
    return `${iconUrl}?size=30x30`;
  }
}
