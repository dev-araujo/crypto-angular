import {
  ChangeDetectorRef,
  Component,
  Input,
  SimpleChanges,
  output,
} from '@angular/core';
import {
  CurrencyPipe,
  NgFor,
  NgIf,
  NgStyle,
  PercentPipe,
} from '@angular/common';

import { CryptoService } from '../../../service/general/crypto.service';
import { PercentageHelper } from '../utils/percentageHelper';
import { SidebarModule } from 'primeng/sidebar';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-sidebar-details',
  standalone: true,
  imports: [SidebarModule, CurrencyPipe, NgStyle, PercentPipe, SkeletonModule],
  templateUrl: './sidebar-details.component.html',
  styleUrl: './sidebar-details.component.scss',
})
export class SidebarDetailsComponent {
  @Input() isVisible = false;
  @Input() uuid: any;
  @Input() signal: any;
  close = output<boolean>();
  coinDetails: any;
  percentageStyle = PercentageHelper;

  constructor(private cdr: ChangeDetectorRef, private service: CryptoService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['uuid'] && this.uuid) {
      this.getDetails();
      this.cdr.detectChanges();
    }
  }

  getDetails() {
    this.coinDetails = null;
    this.service.getDetails(this.uuid).subscribe((res: any) => {
      this.coinDetails = res?.data?.coin;
    });
  }

  hidden() {
    this.close.emit(true);
  }
}
