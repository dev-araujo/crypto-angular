import { BannerComponent } from '../../shared/layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GraphicComponent } from '../../shared/components/graphic/container/graphic.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GraphicComponent],
  template: `<app-graphic></app-graphic>`,
  styleUrl: './chart.component.scss',
})
export class ChartComponent {}
