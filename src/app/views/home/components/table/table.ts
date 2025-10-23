import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { CoinrankingCoin } from '../../../../core/models/coinranking.model';
import { CryptoService } from '../../../../core/services/crypto.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink, SkeletonModule],
  templateUrl: './table.html',
  styleUrls: ['./table.scss'],
})
export class TableComponent {
  @Input() coins: CoinrankingCoin[] = [];
  @Input() loading = true;
  @Input() error: string | null = null;

  @Input() totalRecords = 0;
  @Output() onPageChange = new EventEmitter<any>();

  @Input() offset = 0;

  private _rows = 10;

  @Input()
  set rows(value: number) {
    this._rows = value > 0 ? value : 10;
    this.skeletonItems = Array(this._rows);
  }
  get rows(): number {
    return this._rows;
  }

  public skeletonItems = Array(this._rows);

  private cryptoService = inject(CryptoService);
  public currencyCode$: Observable<string> = this.cryptoService.currencyCode$;

  onPage(event: any) {
    this.onPageChange.emit(event);
  }
}
