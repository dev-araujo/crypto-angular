import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, ButtonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.scss'
})
export class BannerComponent {
 
}
