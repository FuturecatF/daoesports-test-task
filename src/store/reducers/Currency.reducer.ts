import { createSlice } from '@reduxjs/toolkit';

import { CurrencyActions } from '../actions';

import { CurrencyState } from '../types/Currency.types';


const initialState: CurrencyState = {
  status: null,
  currencyObject: null
};


const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CurrencyActions.getCurrency.pending, (state, action) => {
        state.status = false;
      })
      .addCase(CurrencyActions.getCurrency.fulfilled, (state, action) => {
        state.status = true;
        state.currencyObject = action.payload;
      })
      .addCase(CurrencyActions.getCurrency.rejected, (state, action) => {
        state.status = false;
      });
  }
});

export default currencySlice.reducer;