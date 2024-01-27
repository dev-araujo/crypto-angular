import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from '../../shared/components/graphic/graphic.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GraphicComponent, BannerComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {}
