import { RouterLink, RouterModule } from '@angular/router';
import { delay, of } from 'rxjs';

import { AuthService } from '../../../service/auth/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Currency } from '../../../models/shared.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HandleStatus } from '../utils/status-connection';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { NgIf } from '@angular/common';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { RippleModule } from 'primeng/ripple';
import { StateService } from '../../../service/state/state.service';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    DropdownModule,
    InputTextModule,
    TooltipModule,
    FormsModule,
    RouterLink,
    RouterModule,
    NgIf,
    ButtonModule,
    RippleModule,
    ToastModule,
    OverlayPanelModule,
    AvatarModule,
  ],
  providers: [MessageService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly currency = [
    { name: 'USD', code: 'yhjMzLPhuIDl' },
    { name: 'BRL', code: 'n5fpnvMGNsOS' },
  ];
  fiat = this.currency[1];
  find = '';

  iconCopy = 'pi-clone clone pi';

  constructor(
    private stateService: StateService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  getFiat(event: Currency): void {
    this.stateService.sharedFiat(event);
  }

  search(): void {
    if (this.find !== '') {
      this.stateService.sharedSearch(this.find);
    }
  }

  clear(): void {
    if (this.find === '') {
      this.stateService.sharedSearch(this.find);
    }
  }

  account: string | null = null;

  async connect() {
    let status = await this.authService.connect();

    const checking = HandleStatus.checking(status, this.messageService);

    if (checking) {
      this.account = status;
    }
  }

  disconnect() {
    this.authService.disconnect();
    this.account = null;
  }

  clipping(text: string) {
    navigator.clipboard.writeText(text);
    this.iconCopy = 'pi pi-check';
    HandleStatus.showSuccess(
      this.messageService,
      'Copiado para área de transferência',
      'Copiado com sucesso'
    );
    of(null)
      .pipe(delay(1000))
      .subscribe(() => {
        this.iconCopy = 'pi-clone clone pi';
      });
  }
}
