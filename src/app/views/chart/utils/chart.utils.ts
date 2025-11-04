import { CoinrankingHistory } from "../../../core/models/coinranking.model";


export function createGradient(color: string): CanvasGradient | string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return color;

  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, color + '40'); 
  gradient.addColorStop(1, color + '00');
  return gradient;
}


export function formatChartLabels(history: CoinrankingHistory['history'], periodCode: string): string[] {
  return history.map((item: any) => {
    const date = new Date(item.timestamp * 1000);
    switch (periodCode) {
      case '24h':
        return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      case '7d':
      case '30d':
        return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' });
      case '1y':
      case '5y':
        return date.toLocaleDateString('pt-BR', { year: 'numeric', month: 'short' });
      default:
        return date.toLocaleDateString('pt-BR');
    }
  });
}


export function getLinkIcon(type: string): string {
  switch (type.toLowerCase()) {
    case 'twitter':
      return 'bx bxl-twitter';
    case 'reddit':
      return 'bx bxl-reddit';
    case 'github':
      return 'bx bxl-github';
    case 'discord':
      return 'bx bxl-discord';
    case 'telegram':
      return 'bx bxl-telegram';
    case 'youtube':
      return 'bx bxl-youtube';
    case 'facebook':
      return 'bx bxl-facebook';
    case 'linkedin':
      return 'bx bxl-linkedin';
    default:
      return 'bx bx-link-external';
  }
}