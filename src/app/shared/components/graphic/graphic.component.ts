import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import {
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  TimeScale,
} from 'chart.js';
import { Router, RouterModule } from '@angular/router';
import { CryptoService } from '../../../service/crypto.service';
import { Currency } from '../../../models/shared.interface';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [NgIf, RouterModule, ProgressSpinnerModule, StyleClassModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.scss',
})
export class GraphicComponent {
  chart: any = [];
  id: string = '';
  coin: string | any = null;
  image: any;

  constructor(private router: Router, private service: CryptoService) {
    const url = this.router.url.split('/');

    this.id = url[url.length - 2];
    this.getImage();
    this.coin = decodeURIComponent(url[url.length - 1]);
  }

  ngOnInit() {
    this.getFiat();
  }

  getImage(): void {
    this.service.getSymbol(this.id).subscribe(async (res: any) => {
      this.image = await res?.Data.LOGO_URL;
      console.log(this.image);
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
    const chartContainer: any = document.getElementById('chartContainer');
    const canvas = document.createElement('canvas');
    chartContainer.innerHTML = ''; // Limpa o conteúdo anterior
    chartContainer.appendChild(canvas);

    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Unable to get 2D context for canvas');
      return;
    }

    this.service.getCoinHistory(this.id, 'day', fiat).subscribe((res: any) => {
      this.chart = new Chart(context, {
        type: 'line',

        data: {
          labels: res.Data?.Data.map((res: any) => {
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
              data: res.Data.Data.map((obj: { close: string }) => {
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
    console.log(this.chart);
    if (this.chart) {
      await this.chart.destroy();
      this.chart = null;
    }
  }
}
