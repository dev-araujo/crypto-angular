import { Component } from '@angular/core';
import { take } from 'rxjs';
import { CurrencyPipe, NgClass, NgStyle, PercentPipe } from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { CoinList, Currency } from '../../../models/shared.interface';
import { CryptoService } from '../../../service/crypto.service';
import { PercentageHelper } from './utils/percentageHelper';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    TableModule,
    ButtonModule,
    PaginatorModule,
    CurrencyPipe,
    PercentPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  coinList: CoinList | any;
  start = 0 as any;
  rows = 10 as any;
  fiat = 'n5fpnvMGNsOS';
  currencySymbol = 'R$';
  percentageStyle = PercentageHelper;

  constructor(private service: CryptoService) {}

  ngOnInit(): void {
    this.getTrending(this.fiat, this.start);
    this.getFiat();
  }

  getFiat(): void {
    this.service.fiat$.subscribe((fiat: Currency) => {
      this.currencySymbol !== 'BRL' ? '$' : 'R$';
      this.getTrending(fiat.code, this.start);
    });
  }

  getTrending(fiat: string, offset: number): void {
    this.service
      .getTrendingTop(fiat, offset)
      .pipe(take(1))
      .subscribe((res: CoinList) => {
        this.coinList = res.data.coins;
      });
  }

  onPageChange(event: PaginatorState): void {
    console.log(event);
    this.start = event.first;
    this.rows = event.rows;
    this.getTrending(this.fiat, this.start);
  }
}
