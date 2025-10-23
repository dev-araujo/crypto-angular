import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, switchMap, map, combineLatest, BehaviorSubject, of, catchError, tap, Subscription, filter } from 'rxjs';

import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select'; 
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';

import { CryptoService } from '../../core/services/crypto.service';
import { CoinrankingCoinDetail, CoinrankingHistory } from '../../core/models/coinranking.model';

interface TimePeriod {
  name: string;
  code: string;
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    CommonModule, 
    ChartModule, 
    SelectModule, 
    FormsModule, 
    CardModule, 
    SkeletonModule, 
    TagModule, 
    PanelModule,
    DecimalPipe
  ],
  templateUrl: './chart.html',
  styleUrl: './chart.scss'
})
export class ChartComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private cryptoService = inject(CryptoService);
  private coinUuid$ = new BehaviorSubject<string>('');
  
  protected readonly Number = Number; 
  
  // Propriedades para armazenar os dados e status, substituindo o uso principal de observables no template
  public coinDetails: CoinrankingCoinDetail | null = null;

  // Gerenciamento de subscrições
  private subscriptions = new Subscription();

  public timePeriods: TimePeriod[] = [
    { name: '24h', code: '24h' },
    { name: '7 dias', code: '7d' },
    { name: '30 dias', code: '30d' },
    { name: '1 ano', code: '1y' },
    { name: '5 anos', code: '5y' },
  ];
  public selectedPeriod = this.timePeriods[0]; 
  public currencyCode$: Observable<string> = this.cryptoService.currencyCode$;

  public loadingDetails$ = new BehaviorSubject<boolean>(true);
  public loadingHistory$ = new BehaviorSubject<boolean>(true);
  public detailsError$ = new BehaviorSubject<string | null>(null);
  public historyError$ = new BehaviorSubject<string | null>(null);

  public chartData: any;
  public chartOptions: any;

  ngOnInit(): void {
    const uuid = this.route.snapshot.params['uuid'];
    if (uuid) {
      this.coinUuid$.next(uuid);
    }
    
    // Subscrições manuais forçam a chamada imediata das APIs
    this._subscribeToDetails();
    this._subscribeToHistory();
    this._setupChartOptions();
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private _subscribeToDetails(): void {
    const details$ = this.coinUuid$.pipe(
      filter(uuid => !!uuid),
      switchMap((uuid) => {
        this.loadingDetails$.next(true);
        this.detailsError$.next(null);
        
        return this.cryptoService.fetchCoinDetails(uuid).pipe(
          tap((response) => console.log('Coin Details API Status:', response.status)),
          map((response) => {
            this.loadingDetails$.next(false);
            if (response.status === 'success') {
              this.coinDetails = response.data.coin;
              return response.data.coin;
            }
            this.detailsError$.next('Falha ao carregar detalhes da criptomoeda. Status: ' + response.status);
            this.coinDetails = null;
            return null;
          }),
          catchError((err) => {
            this.loadingDetails$.next(false);
            this.detailsError$.next('Erro de rede ao carregar detalhes.');
            this.coinDetails = null;
            console.error('fetchCoinDetails - Network Error:', err);
            return of(null);
          })
        );
      })
    );
    // Adiciona a subscrição para forçar a execução da chamada da API de detalhes
    this.subscriptions.add(details$.subscribe());
  }

  private _subscribeToHistory(): void {
    const historyData$ = combineLatest([
      this.coinUuid$.pipe(filter(uuid => !!uuid)),
      this.cryptoService.currencyUuid$.pipe(filter(uuid => !!uuid)),
      this.loadingDetails$.pipe(filter(loading => !loading)) 
    ]).pipe(
      switchMap(([uuid]) => {
        this.loadingHistory$.next(true);
        this.historyError$.next(null);
        
        return this.cryptoService.fetchCoinHistory(uuid, this.selectedPeriod.code).pipe(
          map((response) => {
            this.loadingHistory$.next(false);
            if (response.status === 'success') {
                return response.data;
            }
            this.historyError$.next('Falha ao carregar histórico de preços. Status: ' + response.status);
            return null;
          }),
          catchError((err) => {
            this.loadingHistory$.next(false);
            this.historyError$.next('Erro de rede ao carregar histórico.');
            console.error('fetchCoinHistory - Network Error:', err);
            return of(null);
          })
        );
      })
    );
    
    // Adiciona a subscrição para forçar a execução da chamada da API de histórico
    this.subscriptions.add(historyData$
        .subscribe((data) => {
            this._prepareChartData(data);
        })
    );
  }

  onTimePeriodChange(newPeriod: TimePeriod): void {
    this.selectedPeriod = newPeriod;
    
    this.loadingHistory$.next(true);
    this.historyError$.next(null);
    const uuid = this.coinUuid$.getValue();
    
    if (uuid) {
        // Nova subscrição para a mudança de período, garantindo que o chartData seja atualizado
        this.subscriptions.add(
            this.cryptoService.fetchCoinHistory(uuid, newPeriod.code).pipe(
                map((response) => {
                    this.loadingHistory$.next(false);
                    if (response.status === 'success') {
                        return response.data;
                    }
                    this.historyError$.next('Falha ao carregar histórico de preços. Status: ' + response.status);
                    return null;
                }),
                catchError((err) => {
                    this.loadingHistory$.next(false);
                    this.historyError$.next('Erro de rede ao carregar histórico.');
                    return of(null);
                })
            ).subscribe((data) => this._prepareChartData(data))
        );
    }
  }

  private _prepareChartData(history: CoinrankingHistory | null): void {
    if (!history || !history.history || history.history.length === 0) {
      this.chartData = null;
      return;
    }

    const prices = history.history
      .map((item) => Number(item.price))
      .filter(price => !isNaN(price)); 

    const labels = history.history.map((item) => {
      const date = new Date(item.timestamp * 1000);
      switch (this.selectedPeriod.code) { 
        case '24h':
          return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        case '7d':
        case '30d':
          return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
        case '1y':
        case '5y':
          return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
        default:
          return date.toLocaleDateString('pt-BR');
      }
    });

    const isNegative = Number(history.change) < 0;
    const color = isNegative ? '#ef4444' : '#22c55e';

    this.chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Preço',
          data: prices,
          fill: false,
          borderColor: color,
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    };
  }

  private _setupChartOptions(): void {
    const textColor = 'rgba(0, 0, 0, 0.87)';
    const textColorSecondary = 'rgba(0, 0, 0, 0.54)';
    const surfaceBorder = 'rgba(0, 0, 0, 0.12)';

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
  }
}