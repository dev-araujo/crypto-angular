import { BannerComponent } from '../../shared/layout/banner/banner.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CryptoService } from '../../service/general/crypto.service';
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
  template: `<app-banner></app-banner>
    <div class="home">
      <app-sidebar-details
        [isVisible]="isVisible"
        (close)="close($event)"
        [info]="info"
        [signal]="signalSymbol"
      ></app-sidebar-details>
      <app-table (emitDetails)="open($event)" [hidden]="isVisible"></app-table>
    </div>`,
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isVisible = false;
  info: any;
  signalSymbol = 'R$';

  ngOnInit(): void {}

  open(event: any) {
    this.isVisible = event?.toggle;
    this.info = event?.info;
    this.signalSymbol = event?.signal;
  }

  close(event: boolean) {
    if (event) {
      this.isVisible = false;
    }
  }
}
