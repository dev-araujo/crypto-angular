import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ChartComponent } from './views/chart/chart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'charts/:id/:coin', component: ChartComponent },
];
