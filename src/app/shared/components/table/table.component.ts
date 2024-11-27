import { CoinList, Currency } from '../../../models/shared.model';
import {
  Component,
  Input,
  SimpleChanges,
  ViewContainerRef,
  output,
} from '@angular/core';
import { NgClass, NgStyle, PercentPipe } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { Router, RouterLink } from '@angular/router';
import { Subject, take } from 'rxjs';

import { AuthService } from '../../../service/auth/auth.service';
import { ButtonModule } from 'primeng/button';
import { CoinPricePipe } from '../../pipes/coinPricePipe';
import { CryptoService } from '../../../service/general/crypto.service';
import { IconUrlPipe } from '../../pipes/iconUrlPipe';
import { StateService } from '../../../service/state/state.service';
import { StyleHelper } from '../../utils/styleHelper';
import { TableModule } from 'primeng/table';
import { changeCurrencySymbol } from '../../utils/currencyViewHelper';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    NgStyle,
    TableModule,
    ButtonModule,
    PaginatorModule,
    PercentPipe,
    NgClass,
    IconUrlPipe,
    CoinPricePipe,
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
  favoriteList: any = {
    account: null,
    favoriteList: [],
  };
  noData = '-';
  favoriteQuery = '';
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  styleHelper = StyleHelper;

  constructor(
    private service: CryptoService,
    private stateService: StateService,
    private authService: AuthService
  ) {}

  private destroy$ = new Subject<void>();

  get isConnected() {
    return this.authService.isConnected();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
    this.listenClickedFavorites();
  }

  listenClickedFavorites() {
    this.stateService.favorites$.subscribe((clicked: boolean) => {
      if (clicked) {
        this.favoriteQuery = this.handleFavoriteParamaters();
      } else {
        this.favoriteQuery = '';
      }
      this.getTrending(this.fiat, this.start, 50);
    });
  }

  handleFavoriteParamaters() {
    return this.favoriteList.favoriteList
      .map((coin: any) => coin.uuid)
      .map((uuid: string) => `uuids[]=${uuid}`)
      .join('&')
      .trim();
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
      this.searching = searching;
      if (searching) {
        this.getTrending(this.fiat, 0, 10, this.searching);
      } else {
        this.getTrending(this.fiat, this.start);
      }
    });
  }

  getTrending(fiat: string, offset: number, rows = 10, find = ''): void {
    this.service
      .getTrendingTop(fiat, offset, rows, find, this.favoriteQuery)
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
    if (this.isLocalStorageAvailable) {
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
  }

  saveFavoriteList() {
    if (this.favoriteList.account && this.isLocalStorageAvailable) {
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
