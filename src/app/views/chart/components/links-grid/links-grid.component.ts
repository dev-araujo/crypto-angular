import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CoinrankingLink } from '../../../../core/models/coinranking.model';
import { getLinkIcon } from '../../utils/chart.utils';

@Component({
  selector: 'app-links-grid',
  imports: [CommonModule, ButtonModule],
  templateUrl: './links-grid.component.html',
  styleUrl: './links-grid.component.scss'
})
export class LinksGridComponent {
  @Input() links: CoinrankingLink[] = [];
  @Input() websiteUrl: string | null = null;

  public getIcon = getLinkIcon;
}