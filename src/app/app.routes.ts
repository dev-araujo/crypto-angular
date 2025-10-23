import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home/home').then((m) => m.HomeComponent),
  },
  {
    path: 'charts/:uuid/:name',
    loadComponent: () =>
      import('./views/chart/chart').then((m) => m.ChartComponent),
  },
];