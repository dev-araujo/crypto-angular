// src/app/services/metamask-auth.service.ts
import { Injectable } from '@angular/core';
import detectEthereumProvider from '@metamask/detect-provider';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private provider: any;
  public account: string | null = null;

  constructor() {
    this.initProvider();
  }

  private async initProvider() {
    this.provider = await detectEthereumProvider();
    if (this.provider) {
      this.provider.on(
        'accountsChanged',
        this.handleAccountsChanged.bind(this)
      );
    } else {
      console.error(
        'MetaMask não foi encontrado. Por favor, instale a extensão.'
      );
    }
  }

  private handleAccountsChanged(accounts: string[]) {
    this.account = accounts.length > 0 ? accounts[0] : null;
  }

  public async connect(): Promise<string | null> {
    if (this.provider) {
      try {
        const accounts = await this.provider.request({
          method: 'eth_requestAccounts',
        });
        this.account = accounts[0];
        return this.account;
      } catch (error) {
        console.error('Erro ao conectar à MetaMask:', error);
        return null;
      }
    } else {
      console.error('MetaMask não está disponível.');
      return null;
    }
  }

  public disconnect() {
    this.account = null;
  }

  public isConnected(): boolean {
    return !!this.account;
  }
}
