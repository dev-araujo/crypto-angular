import { Router, RouterLink, RouterModule } from '@angular/router';

import { AuthService } from '../../../service/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Currency } from '../../../models/shared.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { NgIf } from '@angular/common';
import { StateService } from '../../../service/state/state.service';
import { TooltipModule } from 'primeng/tooltip';

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
    NgIf,
    ButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];
  fiat = this.currency[1];
  find = '';

  constructor(
    private stateService: StateService,
    private authService: AuthService
  ) {}

  getFiat(event: Currency): void {
    this.stateService.sharedFiat(event);
  }

  search(): void {
    if (this.find !== '') {
      this.stateService.sharedSearch(this.find);
    }
  }

  clear(): void {
    if (this.find === '') {
      this.stateService.sharedSearch(this.find);
    }
  }

  account: string | null = null;

  async connect() {
    this.account = await this.authService.connect();
  }

  disconnect() {
    this.authService.disconnect();
    this.account = null;
  }
}
