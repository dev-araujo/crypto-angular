import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { CryptoService } from '../../../services/crypto.service';
import { filter, map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    InputTextModule,
    TooltipModule,
    FormsModule,
    RouterModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    AvatarModule,
    SelectModule,
    CommonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  readonly currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];

  fiat = this.currency[1];
  find = '';

  router = inject(Router);
  private cryptoService = inject(CryptoService);

  public isChartRoute$: Observable<boolean> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => event.url.includes('/charts/'))
  );


  goHome(event: any): void {
    event.preventDefault();
    this.find = '';
    this.cryptoService.setSearchTerm('');
    this.router.navigate(['/']);
  }

  getFiat(event: any): void {
    if (event) {
      this.cryptoService.setCurrency(event.name, event.code);
    }
  }

  search(): void {
    this.cryptoService.setSearchTerm(this.find);
  }

  onInputChange(): void {
    if (!this.find) {
      this.search();
    }
  }
}
