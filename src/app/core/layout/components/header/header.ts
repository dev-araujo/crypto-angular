import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { SelectModule } from 'primeng/select';
import { CryptoService } from '../../../services/crypto.service'; 

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

  router = inject(Router);
  private cryptoService = inject(CryptoService); 

  goHome(event: any): void {
    event.preventDefault(); 
    this.find = '';
    this.cryptoService.setSearchTerm(''); 
    this.router.navigate(['/']); 
  }

  getFiat(event: any): void {
    if (event.value && event.value.code) {
      this.cryptoService.setCurrency(event.value.name, event.value.code); 
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