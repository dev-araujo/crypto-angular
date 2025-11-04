import { Component, Input } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe } from '@angular/common';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { CoinrankingCoinDetail } from '../../../../core/models/coinranking.model';

@Component({
  selector: 'app-metric-grid',
  standalone: true,
  imports: [CommonModule, PanelModule, TooltipModule, DecimalPipe, DatePipe],
  templateUrl: './metric-grid.component.html',
  styleUrl: './metric-grid.component.scss'
})
export class MetricGridComponent {
  @Input() coin: CoinrankingCoinDetail | null = null;
  @Input() currencyCode: string | null = null;
}