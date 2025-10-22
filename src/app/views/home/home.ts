import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CryptoService } from '../../core/services/crypto.service';
import { CoinrankingCoin } from '../../core/models/coinranking.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { TableComponent } from './components/table/table';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [TableComponent, AsyncPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private _cryptoService = inject(CryptoService);
  private _destroy$ = new Subject<void>();

  public coins: CoinrankingCoin[] = [];
  public error: string | null = null;
  public loading$!: Observable<boolean>;
  public totalRecords = 0;
  public limit = 10;
  public offset = 0;

  ngOnInit(): void {
    this._initializeComponent();
  }

  ngOnDestroy(): void {
    this._unsubscribe();
  }

  onPageChange(event: any): void {
    const newLimit = event.rows;
    const newOffset = event.first;
    const limitHasChanged = this.limit !== newLimit;
    const offsetHasChanged = this.offset !== newOffset;

    this.limit = newLimit;

    if (limitHasChanged) {
      this._cryptoService.setLimit(newLimit);
      return;
    }

    if (offsetHasChanged) {
      this._cryptoService.setPage(newOffset);
      return;
    }

    console.log('Evento de paginação redundante ignorado.');
  }

  private _initializeComponent(): void {
    this.loading$ = this._cryptoService.loading$;
    this._subscribeToObservables();
    this._cryptoService.setPage(0);
  }

  private _subscribeToObservables(): void {
    this._cryptoService.error$
      .pipe(takeUntil(this._destroy$))
      .subscribe((error) => {
        this.error = error;
      });

    this._cryptoService.coins$
      .pipe(takeUntil(this._destroy$))
      .subscribe((response) => {
        if (response && response.status === 'success') {
          this.coins = response.data.coins;
          return;
        }
        this.coins = [];
      });

    this._cryptoService.totalRecords$
      .pipe(takeUntil(this._destroy$))
      .subscribe((total) => (this.totalRecords = total));

    this._cryptoService.offset$
      .pipe(takeUntil(this._destroy$))
      .subscribe((offset) => (this.offset = offset));
  }

  private _unsubscribe(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}