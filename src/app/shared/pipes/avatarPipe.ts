import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarUrl',
  standalone: true,
})
export class AvatarPipe implements PipeTransform {
  transform(account: string | null): string {
    return `https://api.dicebear.com/9.x/identicon/svg?seed=${account}`;
  }
}
