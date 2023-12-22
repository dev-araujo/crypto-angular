import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { Router, RouterModule } from '@angular/router';
import { CryptoService } from '../../../service/crypto.service';

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
  title = 'ng-chart';

  constructor(private router: Router, private service: CryptoService) {
    this.id = this.router.url.split('charts/')[1];
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getChart();
  }

  getChart(): void {
    this.service.getCoinHistory(this.id).subscribe((res: any) => {
      console.log(res);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: res.data.history.map((res: { timestamp: Date }) => {
            return res.timestamp;
          }),
          datasets: [
            {
              data: res.data.history.map((res: { price: string }) => {
                return parseFloat(res.price);
              }),
              borderWidth: 1,
            },
          ],
        },
      });
    });
  }
}
