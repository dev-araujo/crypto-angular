import { Injectable } from '@angular/core';
import Chart from 'chart.js/auto';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  createChart(context: CanvasRenderingContext2D, data: any): Chart {
    return new Chart(context, {
      type: 'line',
      data,
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
  }

  destroyChart(chart: Chart): void {
    if (chart) {
      chart.destroy();
    }
  }
}
