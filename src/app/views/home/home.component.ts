import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../service/general/crypto.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TableComponent, BannerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private service: CryptoService) {}

  ngOnInit(): void {}
}
