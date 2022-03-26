import { createAsyncThunk } from '@reduxjs/toolkit';

import CurrencyApi from 'src/api/Currency.api';

export const getCurrency = createAsyncThunk(
  'currency/getCurrency',
  async () => {
    const response = await CurrencyApi.getCurrency();
    return response;
  }
);
