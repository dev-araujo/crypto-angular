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

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.scss',
})
export class GraphicComponent {
  chart: any = [];
  id: string = '';
  coin: string = '';
  title = 'ng-chart';

  constructor(private router: Router, private service: CryptoService) {
    const url = this.router.url.split('/');

    this.id = url[url.length - 2];
    this.coin = decodeURIComponent(url[url.length - 1]);
  }

  ngOnInit() {
    this.getFiat();
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
    this.destroyChart();
    console.log(fiat);
    this.service.getCoinHistory(this.id, 'day', fiat).subscribe((res: any) => {
      this.chart = new Chart('canvas', {
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
            },
          ],
        },

        options: {
          plugins: {
            legend: {
              display: false,
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

  destroyChart(): void {
    if (this.chart instanceof Chart) {
      this.chart.destroy();
    }
  }
}
