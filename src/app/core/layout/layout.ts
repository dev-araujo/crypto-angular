import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header';
import { BannerComponent } from './components/banner/banner';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-layout',
  imports: [CommonModule,HeaderComponent, BannerComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class LayoutComponent {

  private router = inject(Router);

  public showBanner$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event: NavigationEnd) => !event.url.includes('/charts/'))
  );

}
