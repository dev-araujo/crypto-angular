import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { CryptoService } from '../../../service/crypto.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, InputTextModule, TooltipModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];
  fiat = this.currency[1];

  constructor(private service: CryptoService) {}

  getFiat(event: any): void {
    this.service.sharedFiat(event.code);
  }
}
