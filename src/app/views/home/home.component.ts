import { Component, signal } from '@angular/core';

import { BannerComponent } from '../../shared/layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { SidebarDetailsComponent } from '../../shared/components/sidebar-details/sidebar-details.component';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    BannerComponent,
    SidebarDetailsComponent,
  ],
  template: `
    <app-banner></app-banner>
    <div class="home">
      <app-sidebar-details
        [isVisible]="isVisible"
        (close)="close($event)"
        [uuid]="info()"
        [signal]="signalSymbol()"
      ></app-sidebar-details>
      <app-table (emitDetails)="open($event)" [hidden]="isVisible"></app-table>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isVisible = false;
  info = signal<any>(null);
  signalSymbol = signal<string>('R$');

  open(event: any) {
    this.info.set(event?.uuid);
    this.signalSymbol.set(event?.signal);
    this.isVisible = event?.toggle;
  }

  close(event: boolean) {
    if (event) {
      this.isVisible = false;
    }
  }
}
