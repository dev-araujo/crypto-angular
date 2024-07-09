import { Component } from '@angular/core';
import { take } from 'rxjs';
import {
  CurrencyPipe,
  NgClass,
  NgIf,
  NgStyle,
  PercentPipe,
} from '@angular/common';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { CoinList, Currency } from '../../../models/shared.model';
import { CryptoService } from '../../../service/general/crypto.service';
import { PercentageHelper } from './utils/percentageHelper';
import { RouterLink } from '@angular/router';
import { changeCurrencySymbol } from './utils/currencyViewHelper';
import { StateService } from '../../../service/state/state.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgStyle,
    NgClass,
    NgIf,
    TableModule,
    ButtonModule,
    PaginatorModule,
    CurrencyPipe,
    PercentPipe,
    RouterLink,
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
  searching: string = '';
  percentageStyle = PercentageHelper;

  constructor(
    private service: CryptoService,
    private stateService: StateService
  ) {}

  ngOnInit(): void {
    this.getTrending(this.fiat, this.start);
    this.getFiat();
    this.getSearch();
  }

  getFiat(): void {
    this.stateService.fiat$.subscribe((fiat: Currency) => {
      this.fiat = fiat.code;
      this.getTrending(this.fiat, this.start, this.rows, this.searching);
      this.currencySymbol = changeCurrencySymbol(fiat.name);
    });
  }

  getSearch(): void {
    this.stateService.searching$.subscribe((searching: string) => {
      this.searching = searching;

      if (searching !== '') {
        this.getTrending(this.fiat, 0, 10, this.searching);
      } else {
        this.getTrending(this.fiat, this.start);
      }
    });
  }

  getTrending(fiat: string, offset: number, rows = 10, find = ''): void {
    this.service
      .getTrendingTop(fiat, offset, rows, find)
      .pipe(take(1))
      .subscribe((res: CoinList) => {
        this.coinList = res.data.coins;
        this.coinList.forEach((res: any) => {
          res.isFavorite = false;
        });
      });
  }

  onPageChange(event: PaginatorState): void {
    this.start = event.first;
    this.rows = event.rows;
    this.getTrending(this.fiat, this.start, this.rows, this.searching);
  }
}
