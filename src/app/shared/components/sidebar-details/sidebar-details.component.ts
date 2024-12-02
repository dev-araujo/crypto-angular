import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  SimpleChanges,
  output,
} from '@angular/core';
import {
  CurrencyPipe,
  NgClass,
  NgFor,
  NgIf,
  NgStyle,
  PercentPipe,
} from '@angular/common';

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
  @Input() isVisible = false;
  @Input() uuid: any;
  @Input() signal: any;
  close = output<boolean>();
  coinDetails: any;
  styleHelper = StyleHelper;
  noData = '-';

  isMobile=false
  position='right'


  constructor(private cdr: ChangeDetectorRef, private service: CryptoService) {
    this.checkWindowSize(); // Verifica o tamanho da janela na inicialização
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkWindowSize();
  }

  checkWindowSize() {
    this.isMobile = window.innerWidth <= 820;
    this.position = this.isMobile ? 'bottom' : 'right';
  }

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
