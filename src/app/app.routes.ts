import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'charts/:id/:coin',
    loadComponent: () =>
      import('./views/chart/chart.component').then((m) => m.ChartComponent),
  },
];
