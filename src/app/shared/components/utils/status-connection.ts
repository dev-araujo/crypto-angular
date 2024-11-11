import { MessageService } from 'primeng/api';

export class StatusConnection {
  private static showWarn(messageService: MessageService, msg: string) {
    messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: msg,
    });
  }

  private static showError(messageService: MessageService, msg: string) {
    messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: msg,
    });
  }

  static checking(status: string | null, messageService: any): void | boolean {
    if (status?.includes('Erro')) {
      this.showError(messageService, status);
      return;
    }
    if (status?.includes('Alerta')) {
      this.showWarn(messageService, status);
      return;
    }

    return true;
  }
}
