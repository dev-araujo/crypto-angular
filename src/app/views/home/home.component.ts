import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../service/general/crypto.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { BannerComponent } from '../../shared/layout/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, BannerComponent],
  template: `<app-banner></app-banner>
    <div class="home">
      <app-table></app-table>
    </div>`,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private service: CryptoService) {}

  ngOnInit(): void {}
}
