import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from '../../shared/components/graphic/graphic.component';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, GraphicComponent],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {}
