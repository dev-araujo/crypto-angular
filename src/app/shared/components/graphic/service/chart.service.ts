import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CryptoService } from '../../../../service/general/crypto.service';
import { StateService } from '../../../../service/state/state.service';
import { Currency, HistoricalData } from '../../../../models/shared.model';
import Chart from 'chart.js/auto';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(
    private cryptoService: CryptoService,
    private stateService: StateService
  ) {}

  getFiat(): Observable<Currency> {
    return this.stateService.fiat$;
  }

  getSymbol(id: string): Observable<string> {
    return this.cryptoService.getSymbol(id);
  }

  getCoinHistory(
    id: string,
    period: string,
    currency: string | any
  ): Observable<HistoricalData> {
    return this.cryptoService.getCoinHistory(id, period, currency);
  }

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
