import { BannerComponent } from './shared/layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `<main class="container">
    <app-header></app-header>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'cryptocurrency';
}
