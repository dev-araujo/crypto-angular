import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { CryptoService } from '../../../service/crypto.service';
import { Currency } from '../../../models/shared.interface';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];
  fiat = this.currency[1];
  find = '';

  constructor(private router: Router, private service: CryptoService) {}

  getFiat(event: Currency): void {
    this.service.sharedFiat(event);
  }

  search(): void {
    if (this.find !== '') {
      this.service.sharedSearch(this.find);
    }
  }

  clear(): void {
    if (this.find === '') {
      this.service.sharedSearch(this.find);
    }
  }
}
