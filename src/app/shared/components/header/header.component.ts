import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

import { Currency } from '../../../models/shared.model';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { StateService } from '../../../service/state/state.service';

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
  readonly currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];
  fiat = this.currency[1];
  find = '';

  constructor(private router: Router, private stateService: StateService) {}

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
}
