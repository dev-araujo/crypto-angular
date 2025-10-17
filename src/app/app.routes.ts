import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/home/home').then((m) => m.Home),
  },
  {
    path: 'charts/:id/:coin',
    loadComponent: () =>
      import('./views/chart/chart').then((m) => m.Chart),
  },
];