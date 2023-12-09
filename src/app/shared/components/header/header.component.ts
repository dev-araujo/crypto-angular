import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, InputTextModule, TooltipModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currency = [
    { name: 'USD', code: 'USD' },
    { name: 'BRL', code: 'BRL' },
  ];
  fiat = this.currency[1];
}
