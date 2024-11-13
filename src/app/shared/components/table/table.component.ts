import {
  AsyncPipe,
  CurrencyPipe,
  NgClass,
  NgIf,
  NgStyle,
  PercentPipe,
} from '@angular/common';
import { CoinList, Currency } from '../../../models/shared.model';
import { Component, Input, Output, SimpleChanges, output } from '@angular/core';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

import { AuthService } from '../../../service/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CryptoService } from '../../../service/general/crypto.service';
import { PercentageHelper } from '../utils/percentageHelper';
import { RouterLink } from '@angular/router';
import { StateService } from '../../../service/state/state.service';
import { TableModule } from 'primeng/table';
import { changeCurrencySymbol } from '../utils/currencyViewHelper';
import { take } from 'rxjs';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgStyle,
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
  toggleViewDetails = false;
  emitDetails = output<any>();

  @Input() hidden = false;

  coinList: CoinList | any;
  start = 0 as any;
  rows = 10 as any;
  fiat = 'n5fpnvMGNsOS';
  currencySymbol = 'R$';
  searching: string = '';
  percentageStyle = PercentageHelper;
  favoriteList: any = {
    account: null,
    favoriteList: [],
  };

  constructor(
    private service: CryptoService,
    private stateService: StateService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hidden']) {
      this.toggleViewDetails = false;
    }
  }

  ngOnInit(): void {
    this.listenWalletAction();
    this.loadFavoriteList();

    this.getTrending(this.fiat, this.start);
    this.getFiat();
    this.getSearch();
  }

  get isConnected() {
    return this.authService.isConnected();
  }

  listenWalletAction() {
    this.stateService.connection$.subscribe((connected: boolean) => {
      if (connected) {
        this.loadFavoriteList();
      }
    });
  }

  getDetails(coin: any, currencySymbol: string) {
    this.toggleViewDetails = !this.toggleViewDetails;
    this.emitDetails.emit({
      toggle: this.toggleViewDetails,
      uuid: coin?.uuid,
      signal: currencySymbol,
    });
  }

  getFiat(): void {
    this.stateService.fiat$.subscribe((fiat: Currency) => {
      if (this.fiat !== fiat.code) {
        this.fiat = fiat.code;
        this.getTrending(this.fiat, this.start, this.rows, this.searching);
        this.currencySymbol = changeCurrencySymbol(fiat.name);
      }
    });
  }

  getSearch(): void {
    this.stateService.searching$.subscribe((searching: string) => {
      if (searching) {
        this.searching = searching;

        if (searching !== '') {
          this.getTrending(this.fiat, 0, 10, this.searching);
        } else {
          this.getTrending(this.fiat, this.start);
        }
      }
    });
  }

  getTrending(fiat: string, offset: number, rows = 10, find = ''): void {
    this.service
      .getTrendingTop(fiat, offset, rows, find)
      .pipe(take(1))
      .subscribe((res: CoinList) => {
        this.coinList = res.data.coins;
        this.updateFavoriteStatus();
      });
  }

  handleFavorites(coin: any) {
    if (coin?.favorite) {
      coin.favorite = false;
      this.favoriteList.favoriteList = this.favoriteList.favoriteList.filter(
        (item: any) => item.uuid !== coin.uuid
      );
    } else {
      this.favoriteList.favoriteList.push(coin);
      coin.favorite = true;
    }
    this.saveFavoriteList();
  }

  loadFavoriteList() {
    const account = localStorage.getItem('account');
    if (account) {
      this.favoriteList.account = account;
      const storedList = localStorage.getItem(`favoriteList_${account}`);
      if (storedList) {
        this.favoriteList.favoriteList = JSON.parse(storedList);
      } else {
        this.favoriteList.favoriteList = [];
      }
    }
  }

  saveFavoriteList() {
    if (this.favoriteList.account) {
      localStorage.setItem(
        `favoriteList_${this.favoriteList.account}`,
        JSON.stringify(this.favoriteList.favoriteList)
      );
    }
  }

  updateFavoriteStatus() {
    this.coinList.forEach((coin: any) => {
      coin.favorite = this.favoriteList.favoriteList.some(
        (fav: any) => fav.uuid === coin.uuid
      );
    });
  }

  onPageChange(event: PaginatorState): void {
    this.start = event.first;
    this.rows = event.rows;
    this.getTrending(this.fiat, this.start, this.rows, this.searching);
  }
}
