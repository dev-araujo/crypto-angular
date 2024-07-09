import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ChartService } from '../service/chart.service';
import { CryptoService } from '../../../../service/general/crypto.service';
import { StateService } from '../../../../service/state/state.service';
import { Currency, HistoricalData } from '../../../../models/shared.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';
import { NoGraphicComponent } from '../../no-graphic/no-graphic.component';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [
    NgIf,
    RouterModule,
    ProgressSpinnerModule,
    StyleClassModule,
    NoGraphicComponent,
  ],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chart: Chart | null = null;
  id: string = '';
  coin: string | null = null;
  image: string | null = null;
  hasChart = true;

  constructor(
    private router: Router,
    private cryptoService: CryptoService,
    private stateService: StateService,
    private chartService: ChartService
  ) {
    const urlSegments = this.router.url.split('/');
    this.id = urlSegments[urlSegments.length - 2];
    this.coin = decodeURIComponent(urlSegments[urlSegments.length - 1]);
  }

  ngOnInit(): void {
    this.getFiat();
  }

  ngAfterViewInit(): void {
    this.getImage();
    this.getChart();
  }

  getImage(): void {
    this.cryptoService.getSymbol(this.id).subscribe((res: string) => {
      this.image = res;
    });
  }

  getFiat(): void {
    this.stateService.fiat$.subscribe((fiat: Currency) => {
      this.getChart(fiat.name);
    });
  }

  getChart(fiat?: string): void {
    if (!this.chartContainer) {
      console.error('Unable to find chartContainer element');
      return;
    }

    this.cryptoService
      .getCoinHistory(this.id, 'day', fiat)
      .subscribe((res: HistoricalData) => {
        this.hasChart = res.response !== 'Error';

        if (this.hasChart && this.chartContainer) {
          this.destroyChart();
          const canvas = document.createElement('canvas');
          this.chartContainer.nativeElement.appendChild(canvas);
          const context = canvas.getContext('2d');

          if (context) {
            const data = {
              labels: res.data.map((dataPoint) => {
                const date = new Date(dataPoint.time);
                return `${date.getHours().toString().padStart(2, '0')}:${date
                  .getMinutes()
                  .toString()
                  .padStart(2, '0')}`;
              }),
              datasets: [
                {
                  data: res.data.map((obj) => parseFloat(obj.close)),
                  borderWidth: 1,
                  borderColor: '#2f8542',
                  fill: true,
                  backgroundColor: '#a5f3c859',
                  pointStyle: false,
                },
              ],
            };
            this.chart = this.chartService.createChart(context, data);
          } else {
            console.error('Unable to get 2D context for canvas');
          }
        }
      });
  }

  destroyChart(): void {
    if (this.chart) {
      this.chartService.destroyChart(this.chart);
      this.chart = null;
    }
  }
}
