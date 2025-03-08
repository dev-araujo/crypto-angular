import { Injectable } from '@angular/core';
import { MetaMaskEthereumProvider } from './auth.interface';
import detectEthereumProvider from '@metamask/detect-provider';
import { messages } from './messages';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _provider: MetaMaskEthereumProvider | undefined | null;
  private _isLocalStorageAvailable = typeof localStorage !== 'undefined';
  private _localStorageAccount = 'account';
  public account: string | any = null;

  constructor() {
    this.initProvider();
  }

  private async initProvider(): Promise<void> {
    this._provider = await detectEthereumProvider();

    if (!this._provider) {
      console.error(messages['notFound']);
    } else {
      this._provider?.on(
        'accountsChanged',
        this.handleAccountsChanged?.bind(this)
      );
    }
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (accounts) {
      this.account = accounts[0];
    }
  }

  public async connect(): Promise<string | null> {
    if (!this._provider) {
      console.warn(messages['notAvailable']);
      return messages['notAvailable'];
    } else {
      try {
        const accounts = await this._provider.request({
          method: 'eth_requestAccounts',
        });
        this.account = accounts[0];
        if (this._isLocalStorageAvailable) {
          localStorage.setItem(this._localStorageAccount, this.account);
        }

        return this.account;
      } catch (error) {
        console.error(messages.error(error));
        return messages.error(error);
      }
    }
  }

  public disconnect(): void {
    if (this._isLocalStorageAvailable) {
      localStorage.removeItem(this._localStorageAccount);
    }
    this.account = null;
  }

  public isConnected(): boolean {
    if (this._isLocalStorageAvailable) {
      const account = localStorage.getItem(this._localStorageAccount);
      return !!account;
    }
    return false;
  }
}
