export class StyleHelper {
  static iconArrows(change: string): string {
    if (change) {
      return change.startsWith('-')
        ? 'pi pi-arrow-down-right'
        : 'pi pi-arrow-up-right';
    }
    return '';
  }

  static iconFavorite(favorite: string): string {
    return favorite ? 'pi pi-heart-fill' : 'pi pi-heart';
  }

  static upAndDownStyle(change: string): any {
    const isNegative = change?.startsWith('-');

    return {
      color: isNegative ? '#f03528' : '#2f8542',
      'font-weight': 'bold',
    };
  }
}
