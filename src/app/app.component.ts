import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { BannerComponent } from './shared/layout/banner/banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, BannerComponent],
  template: `<main class="container">
    <app-header></app-header>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cryptocurrency';
}
