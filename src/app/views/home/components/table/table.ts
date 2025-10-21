import { Component, Input, inject, Output, EventEmitter }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CoinrankingCoin } from '../../../../core/models/coinranking.model';
import { CryptoService } from '../../../../core/services/crypto.service'; 
import { Observable } from 'rxjs'; 
import { RouterLink } from '@angular/router'; 

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    RouterLink,
  ], 
  templateUrl: './table.html',
  styleUrls: ['./table.scss']
})
export class Table {
  @Input() coins: CoinrankingCoin[] = [];
  @Input() loading = true;
  @Input() error: string | null = null;
  
  @Input() totalRecords = 0;
  @Input() rows = 10;
  @Output() onPageChange = new EventEmitter<any>();

  private cryptoService = inject(CryptoService);
  public currencyCode$: Observable<string> = this.cryptoService.currencyCode$;

  onPage(event: any) {
    this.onPageChange.emit(event);
  }

}