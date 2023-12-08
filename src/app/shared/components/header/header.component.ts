import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  currency = [
    { name: 'USD', code: 'USD' },
    { name: 'BRL', code: 'BRL' },
  ];
  selected = this.currency[1];
}
