import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
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
  oneDayLabels = [
    '08:00',
    '10:00',
    '12:00',
    '14:00',
    '16:00',
    '18:00',
    '20:00',
    '22:00',
    '00:00',
    '02:00',
    '04:00',
    '06:00',
  ];

  constructor(private router: Router, private service: CryptoService) {
    const url = this.router.url.split('/');

    this.id = url[url.length - 2];
    this.coin = decodeURIComponent(url[url.length - 1]);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getChart();
    this.getFiat();
  }

  getFiat(): void {
    this.service.fiat$.subscribe((fiat: Currency) => {
      this.getChart(fiat.code);
    });
  }

  getChart(fiat?: string): void {
    this.destroyChart();

    this.service.getCoinHistory(this.id, '24h', fiat).subscribe((res: any) => {
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.oneDayLabels,
          datasets: [
            {
              data: res.data.history.map((res: { price: string }) => {
                return parseFloat(res.price).toFixed(2);
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
