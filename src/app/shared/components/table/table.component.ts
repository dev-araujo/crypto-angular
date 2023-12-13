import { Component } from '@angular/core';
import { CryptoService } from '../../../service/crypto.service';
import { take } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [TableModule, ButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  coinList: any;
  offset: number = 0;
  constructor(private service: CryptoService) {}

  ngOnInit(): void {
    this.getTrending();
  }

  getTrending(offset?: number): void {
    this.service
      .getTrendingTop('n5fpnvMGNsOS', offset)
      .pipe(take(1))
      .subscribe((res: any) => {
        console.log(res);
        this.coinList = res.data.coins;
      });
  }

  getPage(e: any) {
    if (e.first === 90) {
      this.getTrending(100);
    }
    console.log(e);
  }
}
