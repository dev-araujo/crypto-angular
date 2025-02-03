import {
  Component,
  HostListener,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CurrencyPipe, NgClass, NgStyle, PercentPipe } from '@angular/common';

import { CryptoService } from '../../../service/general/crypto.service';
import { LowVolumePipe } from '../../pipes/lowVolumePipe';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';
import { StyleHelper } from '../../utils/styleHelper';

@Component({
  selector: 'app-sidebar-details',
  standalone: true,
  imports: [
    SidebarModule,
    CurrencyPipe,
    NgStyle,
    PercentPipe,
    SkeletonModule,
    NgClass,
    LowVolumePipe,
  ],
  templateUrl: './sidebar-details.component.html',
  styleUrl: './sidebar-details.component.scss',
})
export class SidebarDetailsComponent {
  isVisible = input<boolean>(false);
  uuid = input<any>(null);
  signal = input<any>(null);

  close = output<boolean>();
  coinDetails = signal<any>(null);
  styleHelper = StyleHelper;
  noData = '-';
  isMobile = signal(false);
  position = signal('right');

  constructor(private service: CryptoService) {
    this.checkWindowSize();

    effect(
      () => {
        const currentUuid = this.uuid();
        if (currentUuid) {
          this.getDetails(currentUuid);
        }
      },
      { allowSignalWrites: true }
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    const isMobile = window.innerWidth <= 820;
    this.isMobile.set(isMobile);
    this.position.set(isMobile ? 'bottom' : 'right');
  }

  getDetails(uuid: string) {
    this.coinDetails.set(null);
    this.service.getDetails(uuid).subscribe((res: any) => {
      this.coinDetails.set(res?.data?.coin);
    });
  }

  hidden() {
    this.close.emit(true);
  }
}
