import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { CoinrankingCoinDetail } from '../../../../core/models/coinranking.model';

@Component({
  selector: 'app-coin-header',
  standalone: true,
  imports: [CommonModule, TagModule, DecimalPipe],
  templateUrl: './coin-header.component.html',
  styleUrl: './coin-header.component.scss'
})
export class CoinHeaderComponent {
  @Input() coin: CoinrankingCoinDetail | null = null;
  @Input() currencyCode: string | null = null;

  protected readonly Number = Number;
}