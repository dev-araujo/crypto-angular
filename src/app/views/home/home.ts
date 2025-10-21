import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CryptoService } from '../../core/services/crypto.service';
import { CoinrankingCoin } from '../../core/models/coinranking.model';
import { Table } from './components/table/table';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Table],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private cryptoService = inject(CryptoService);
  private destroy$ = new Subject<void>();

  public coins: CoinrankingCoin[] = [];
  public loading = true;
  public error: string | null = null;

  public totalRecords = 0;
  public limit = 10;

  ngOnInit(): void {
    this.cryptoService.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => (this.loading = loading));

    this.cryptoService.error$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => (this.error = error));

    this.cryptoService.coins$.pipe(takeUntil(this.destroy$)).subscribe((response) => {
      if (response && response.status === 'success') {
        this.coins = response.data.coins;
      } else {
        this.coins = [];
      }
    });

    this.cryptoService.totalRecords$
      .pipe(takeUntil(this.destroy$))
      .subscribe((total) => (this.totalRecords = total));

    this.cryptoService.limit$
      .pipe(takeUntil(this.destroy$))
      .subscribe((limit) => (this.limit = limit));
  }

  onPageChange(event: any): void {
    console.log('Evento de paginação:', event);
    if (this.limit !== event.rows) {
      this.cryptoService.setLimit(event.rows);
    } else {
      this.cryptoService.setPage(event.first);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
