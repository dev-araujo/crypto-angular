import { RouterLink, RouterModule } from '@angular/router';
import { delay, of } from 'rxjs';

import { AuthService } from '../../../service/auth/auth.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarPipe } from '../../pipes/avatarPipe';
import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';
import { Currency } from '../../../models/shared.model';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HandleStatus } from '../../utils/status-connection';
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
    ButtonModule,
    RippleModule,
    ToastModule,
    OverlayPanelModule,
    AvatarModule,
    AvatarPipe,
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

  favoriteStatus = {
    true: 'pi pi-heart-fill',
    false: 'pi pi-heart',
  };

  iconCopy = 'pi-clone clone pi';
  iconHeart: any = this.favoriteStatus['false'];

  account!: string | null;
  shortAccount!: string | null;

  isFavoriteActive = false;

  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(
    private stateService: StateService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    if (this.isLocalStorageAvailable) {
      this.account = this.authService.isConnected()
        ? localStorage.getItem('account')
        : null;
    }
  }

  favorites() {
    this.isFavoriteActive = !this.isFavoriteActive;
    this.iconHeart =
      this.favoriteStatus[this.isFavoriteActive ? 'true' : 'false'];
    this.stateService.sharedFavoritesClicked(this.isFavoriteActive);
  }

  getFiat(event: Currency): void {
    this.stateService.sharedFiat(event);
  }

  search(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    this.stateService.sharedSearch(this.find);
  }

  onInputChange(): void {
    if (!this.find) {
      this.stateService.sharedSearch('');
    }
  }

  async connect() {
    let status = await this.authService.connect();

    const checking = HandleStatus.checking(status, this.messageService);

    if (checking) {
      this.account = status;
      this.shortAccount = (status ?? '').substring(0, 12);
      this.stateService.sharedWalletClick(true);
    }
  }

  disconnect() {
    this.authService.disconnect();
    this.stateService.sharedWalletClick(false);

    HandleStatus.showWarn(this.messageService, 'Desconectado');

    this.account = null;
    this.isFavoriteActive = false;
    this.iconHeart =
      this.favoriteStatus[this.isFavoriteActive ? 'true' : 'false'];
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
