import axios from 'axios';

import { CurrencyObject } from 'src/types';

import Api from './Api';

export class CurrencyApi extends Api {
  getCurrency = (): Promise<CurrencyObject> =>
    axios
      .get(`${this.baseUrl}`)
      .then((response) => this._getResponseData(response))
      .catch(this._handleError);
}

export default new CurrencyApi();
