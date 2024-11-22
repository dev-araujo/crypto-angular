// src/app/services/metamask-auth.service.ts
import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private provider: any;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  public account: string | any = null;
  private localStorageAccount = 'account';

  constructor() {
    this.initProvider();
  }

  private async initProvider() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.provider?.on(
        'accountsChanged',
        this.handleAccountsChanged?.bind(this)
      );
    } else {
      console.error(
        'MetaMask não foi encontrado. Por favor, instale a extensão.'
      );
    }
  }

  private handleAccountsChanged(accounts: string[]) {
    if (accounts) {
      this.account = accounts[0];
    }
  }

  public async connect(): Promise<string | null> {
    if (this.provider) {
      try {
        const accounts = await this.provider.request({
          method: 'eth_requestAccounts',
        });
        this.account = accounts[0];
        if (this.isLocalStorageAvailable) {
          localStorage.setItem(this.localStorageAccount, this.account);
        }

        return this.account;
      } catch (error) {
        return `Erro ao conectar à MetaMask:${error}`;
      }
    } else {
      return 'Alerta: MetaMask não está disponível.';
    }
  }

  public disconnect() {
    if (this.isLocalStorageAvailable) {
      localStorage.removeItem(this.localStorageAccount);
    }
    this.account = null;
  }

  public isConnected(): boolean {
    if (this.isLocalStorageAvailable) {
      const account = localStorage.getItem(this.localStorageAccount);
      return !!account;
    }
    return false;
  }
}
