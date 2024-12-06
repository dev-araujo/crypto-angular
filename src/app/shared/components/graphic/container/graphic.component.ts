import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Currency, HistoricalData } from '../../../../models/shared.model';
import { Router, RouterModule } from '@angular/router';

import Chart from 'chart.js/auto';
import { ChartService } from '../service/chart.service';
import { HandleStatus } from '../../../utils/status-connection';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { NoGraphicComponent } from '../../../layout/no-graphic/no-graphic.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [
    RouterModule,
    ProgressSpinnerModule,
    StyleClassModule,
    NoGraphicComponent,
  ],
  providers: [MessageService],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent
  implements OnInit, AfterViewInit, AfterViewChecked
{
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chart: Chart | null = null;
  id: string = '';
  coin: string | null = null;
  image: string | null = null;
  hasChart = true;
  fiat: string = '';

  constructor(
    private router: Router,
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
    private messageService: MessageService
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
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  getImage(): void {
    this.chartService.getSymbol(this.id).subscribe((res: string) => {
      this.image =  res?? res;
    });
  }

  getFiat(): void {
    this.chartService.getFiat().subscribe((fiat: Currency) => {
      this.fiat = fiat.name;
      setTimeout(() => {
        this.cdr.detectChanges();
        this.getChart(this.fiat);
      }, 0);
    });
  }

  getChart(fiat = this.fiat): void {
    if (!this.chartContainer) {
      return;
    }

    this.chartService
      .getCoinHistory(this.id, 'day', fiat)
      .subscribe((res: HistoricalData) => {
        this.hasChart = res.response !== 'Error';

        const existingCanvas =
            this.chartContainer.nativeElement.querySelector('canvas');

          if (existingCanvas) {
            existingCanvas.remove();
          }

        if (this.hasChart && this.chartContainer) {
          this.destroyChart();


          const canvas = document.createElement('canvas');
          this.chartContainer.nativeElement.appendChild(canvas);
          const context = canvas.getContext('2d');

          if (context) {
            const closePrices = res.data.map((obj) => parseFloat(obj.close))

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
                  data: closePrices,
                  borderWidth: 1,
                  borderColor: '#2f8542',
                  fill: true,
                  backgroundColor: '#a5f3c859',
                  pointStyle: false,
                  tension: 0.8,
                },
              ],
            };
            this.chart = this.chartService.createChart(context, data);
          } else {
            HandleStatus.showError(
              this.messageService,
              'Algum erro inesperado ocorreu :('
            );
          }
        } else {
          HandleStatus.showWarn(
            this.messageService,
            'Não há dados suficientes para gerar o gráfico'
          );
          this.hasChart = false;
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
