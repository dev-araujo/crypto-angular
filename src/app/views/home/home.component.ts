import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from '../../service/general/crypto.service';
import { TableComponent } from '../../shared/components/table/table.component';
import { BannerComponent } from '../../shared/layout/banner/banner.component';
import { SidebarDetailsComponent } from '../../shared/components/sidebar-details/sidebar-details.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    BannerComponent,
    SidebarDetailsComponent,
  ],
  template: `<app-banner></app-banner>
    <div class="home">
      <app-sidebar-details
        [isVisible]="isVisible"
        (close)="close($event)"
      ></app-sidebar-details>
      <app-table (emitDetails)="open($event)" [hidden]="isVisible"></app-table>
    </div>`,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isVisible = false;
  ngOnInit(): void {}

  open(event: any) {
    this.isVisible = event;
  }

  close(event: boolean) {
    if (event) {
      this.isVisible = false;
    }
  }
}
