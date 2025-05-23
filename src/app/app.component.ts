import { BannerComponent } from './shared/layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { StateService } from './service/state/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `<main
    class="container"
    [ngStyle]="{ 'overflow-y': detailsIsOpen ? 'hidden' : 'auto' }"
  >
    <app-header></app-header>
    <router-outlet></router-outlet>
  </main>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  stateService = inject(StateService);

  title = 'cryptocurrency';
  detailsIsOpen = false;

  ngOnInit(): void {
    this.handleDetailsOpen();
  }

  handleDetailsOpen() {
    this.stateService.detailsOpen$.subscribe((open: boolean) => {
      this.detailsIsOpen = open;
    });
  }
}
