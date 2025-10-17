import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';

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
    SelectModule
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

  router = inject(Router)

  goHome(event:any): void {
    this.find = '';
    this.search();
  }

  getFiat(event: any): void {
    console.log('Moeda alterada para:', event);
  }

  search(): void {
    console.log('Buscando por:', this.find);
  }

  onInputChange(): void {
    if (!this.find) {
      this.search();
    }
  }
}
