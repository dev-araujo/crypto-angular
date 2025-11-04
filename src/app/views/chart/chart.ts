import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Observable,
  switchMap,
  map,
  combineLatest,
  BehaviorSubject,
  of,
  catchError,
  Subscription,
  filter,
  tap,
} from 'rxjs';

import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

import { CryptoService } from '../../core/services/crypto.service';
import { CoinrankingCoinDetail, CoinrankingHistory, TimePeriod } from '../../core/models/coinranking.model';

import { CoinHeaderComponent } from './components/coin-header/coin-header.component';
import { MetricGridComponent } from './components/metric-grid/metric-grid.component';
import { LinksGridComponent } from './components/links-grid/links-grid.component';
import { createGradient, formatChartLabels } from './utils/chart.utils';
import { TIME_PERIODS } from './constants/time-period.constant';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    SelectButtonModule,
    SkeletonModule,
    TagModule,
    PanelModule,
    TooltipModule,
    ButtonModule,
    CoinHeaderComponent,
    MetricGridComponent,
    LinksGridComponent,
  ],
  templateUrl: './chart.html',
  styleUrl: './chart.scss',
})
export class ChartComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private cryptoService = inject(CryptoService);
  private subscriptions = new Subscription();

  public coinDetails: CoinrankingCoinDetail | null = null;
  public loadingDetails$ = new BehaviorSubject<boolean>(true);
  public detailsError$ = new BehaviorSubject<string | null>(null);

  public timePeriods = TIME_PERIODS;
  public selectedPeriod = this.timePeriods[0];
  private selectedPeriod$ = new BehaviorSubject<TimePeriod>(this.timePeriods[0]);

  public chartData: any;
  public chartOptions: any;
  public loadingHistory$ = new BehaviorSubject<boolean>(true);
  public historyError$ = new BehaviorSubject<string | null>(null);

  public currencyCode$: Observable<string> = this.cryptoService.currencyCode$;
  protected readonly Number = Number;

  ngOnInit(): void {
    this._subscribeToDetails();
    this._subscribeToHistory();
    this._setupChartOptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _subscribeToDetails(): void {
    const detailsSub = this.route.paramMap
      .pipe(
        map((params) => params.get('uuid')),
        filter((uuid): uuid is string => !!uuid),
        tap(() => {
          this.loadingDetails$.next(true);
          this.detailsError$.next(null);
          this.coinDetails = null;
        }),
        switchMap((uuid) =>
          this.cryptoService.fetchCoinDetails(uuid).pipe(
            catchError((err) => {
              this.loadingDetails$.next(false);
              this.detailsError$.next('Erro de rede ao carregar detalhes.');
              return of(null);
            })
          )
        )
      )
      .subscribe((response) => {
        this.loadingDetails$.next(false);

        if (!response || response.status !== 'success') {
          this.coinDetails = null;
          if (!this.detailsError$.getValue()) {
            this.detailsError$.next('Falha ao carregar detalhes da criptomoeda.');
          }
          return;
        }

        this.detailsError$.next(null);
        this.coinDetails = response.data.coin;
      });

    this.subscriptions.add(detailsSub);
  }

  private _subscribeToHistory(): void {
    const historySub = combineLatest([
      this.route.paramMap.pipe(map((params) => params.get('uuid'))),
      this.cryptoService.currencyUuid$,
      this.selectedPeriod$,
    ])
      .pipe(
        filter(([uuid]) => !!uuid),
        tap(() => {
          this.loadingHistory$.next(true);
          this.historyError$.next(null);
        }),
        switchMap(([uuid, currencyUuid, period]) =>
          this.cryptoService.fetchCoinHistory(uuid!, period.code).pipe(
            catchError((err) => {
              this.loadingHistory$.next(false);
              this.historyError$.next('Erro de rede ao carregar histórico.');
              return of(null);
            })
          )
        )
      )
      .subscribe((response) => {
        this.loadingHistory$.next(false);

        if (!response || response.status !== 'success') {
          this.chartData = null;
          if (!this.historyError$.getValue()) {
            this.historyError$.next('Falha ao carregar histórico de preços.');
          }
          return;
        }

        this.historyError$.next(null);
        this._prepareChartData(response.data);
      });

    this.subscriptions.add(historySub);
  }

  onTimePeriodChange(newPeriod: TimePeriod): void {
    this.selectedPeriod$.next(newPeriod);
  }

  private _prepareChartData(history: CoinrankingHistory | null): void {
    if (!history || !history.history || history.history.length === 0) {
      this.chartData = null;
      return;
    }

    const correctedHistory = [...history.history].reverse();
    const prices = correctedHistory
      .map((item) => Number(item.price))
      .filter((price) => !isNaN(price));

    const labels = formatChartLabels(correctedHistory, this.selectedPeriod$.getValue().code);

    const isNegative = Number(history.change) < 0;
    const color = isNegative ? '#f87171' : '#4ade80';

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Preço',
          data: prices,
          fill: true,
          borderColor: color,
          backgroundColor: createGradient(color),
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2.5,
        },
      ],
    };
  }

  private _setupChartOptions(): void {
    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: 'var(--accent-green)',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          ticks: { color: 'var(--text-secondary)' },
          grid: { display: false },
          border: { display: false },
        },
        y: {
          ticks: { color: 'var(--text-secondary)' },
          grid: { color: 'rgba(0, 0, 0, 0.05)' },
          border: { display: false },
        },
      },
      interaction: {
        intersect: false,
        mode: 'index',
      },
    };
  }
}
