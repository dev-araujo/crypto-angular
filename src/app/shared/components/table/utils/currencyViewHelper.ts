export const changeCurrencySymbol = (fiat: string): string => {
  return fiat !== 'BRL' ? '$' : 'R$';
};
