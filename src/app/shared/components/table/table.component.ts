import { Component } from '@angular/core';
import { CryptoService } from '../../../service/crypto.service';
import { take } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule, PaginatorModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  coinList: any;
  start: number = 0;
  rows: number = 10;
  fiat = 'n5fpnvMGNsOS';
  constructor(private service: CryptoService) {}

  ngOnInit(): void {
    this.getTrending(this.fiat, this.start);
    this.getFiat();
  }

  getFiat(): void {
    this.service.fiat$.subscribe((res: string) => {
      this.getTrending(res, this.start);
    });
  }

  getTrending(fiat: string, offset: number): void {
    this.service
      .getTrendingTop(fiat, offset)
      .pipe(take(1))
      .subscribe((res: any) => {
        this.coinList = res.data.coins;
      });
  }

  onPageChange(event: any) {
    this.start = event.first;
    this.rows = event.rows;
    this.getTrending(this.fiat, this.start);
  }
}
