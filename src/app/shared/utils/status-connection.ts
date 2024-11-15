import { MessageService } from 'primeng/api';

export class HandleStatus {
  static showWarn(messageService: MessageService, msg: string) {
    messageService.add({
      severity: 'warn',
      summary: 'Aviso',
      detail: msg,
    });
  }

  static showError(messageService: MessageService, msg: any) {
    messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: msg,
    });
  }

  static showSuccess(messageService: MessageService, msg: any, title: string) {
    messageService.add({
      severity: 'success',
      summary: title,
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
