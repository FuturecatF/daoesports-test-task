export interface CurrencyObject {
  rates: Currency;

}

export interface Currency {
  RUB: number;
  USD: number;
  EUR: number;
}

export type ChangeModificator = 'changing' | 'get';