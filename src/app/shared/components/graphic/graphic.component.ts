import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router, RouterModule } from '@angular/router';
import { CryptoService } from '../../../service/crypto.service';
import {
  Currency,
  HistoricalData,
  HistoricalObj,
} from '../../../models/shared.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';
import { NoGraphicComponent } from '../no-graphic/no-graphic.component';

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
  styleUrl: './graphic.component.scss',
})
export class GraphicComponent {
  @ViewChild('chartContainer') chartContainer!: ElementRef;

  chart: any = [];
  id: string = '';
  coin: string | any = null;
  image: any = null;
  hasChart = true;

  constructor(private router: Router, private service: CryptoService) {
    const url = this.router.url.split('/');

    this.id = url[url.length - 2];
    this.getImage();
    this.coin = decodeURIComponent(url[url.length - 1]);
  }

  ngOnInit(): void {
    this.getFiat();
  }

  getImage(): void {
    this.service.getSymbol(this.id).subscribe(async (res: string) => {
      this.image = await res;
    });
  }

  ngAfterViewInit(): void {
    this.getChart();
  }

  getFiat(): void {
    this.service.fiat$.subscribe((fiat: Currency) => {
      this.getChart(fiat.name);
    });
  }

  getChart(fiat?: string): void {
    if (!this.chartContainer) {
      console.error('Unable to find chartContainer element');
      return;
    }

    this.chartContainer.nativeElement.innerHTML = ''; // Limpa o conteúdo anterior
    const canvas = document.createElement('canvas');
    this.chartContainer.nativeElement.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Unable to get 2D context for canvas');
      return;
    }

    this.service
      .getCoinHistory(this.id, 'day', fiat)
      .subscribe(async (res: HistoricalData) => {
        this.hasChart = res.response !== 'Error';
        this.chart = new Chart(context, {
          type: 'line',

          data: {
            labels: res.data.map((res: any) => {
              const date = new Date(res.time);
              date.toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo',
              });
              const hours = date.getHours().toString().padStart(2, '0');
              const minutes = date.getMinutes().toString().padStart(2, '0');

              return hours + ':' + minutes;
            }),

            datasets: [
              {
                data: res.data.map((obj: { close: number | any }) => {
                  return parseFloat(obj.close);
                }),
                borderWidth: 1,
                borderColor: '#2f8542',

                fill: true,
                backgroundColor: '#a5f3c859',
                pointStyle: false,
              },
            ],
          },

          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              legend: {
                display: false,
                labels: {
                  usePointStyle: false,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
              },
            },
          },
        });
      });
  }

  async destroyChart(): Promise<void> {
    if (this.chart) {
      await this.chart.destroy();
      this.chart = null;
    }
  }
}
