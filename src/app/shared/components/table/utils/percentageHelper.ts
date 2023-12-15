export class PercentageHelper {
  static getChangeCellStyle(change: string): any {
    const isNegative = change.startsWith('-');

    return {
      color: isNegative ? '#f03528' : '#2f8542',
      'font-weight': 'bold',
    };
  }
}
