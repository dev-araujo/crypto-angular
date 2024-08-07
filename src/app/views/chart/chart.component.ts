import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from '../../shared/components/graphic/container/graphic.component';
import { BannerComponent } from '../../shared/layout/banner/banner.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GraphicComponent, BannerComponent],
  template: `<app-graphic></app-graphic>`,
  styleUrl: './chart.component.scss',
})
export class ChartComponent {}
