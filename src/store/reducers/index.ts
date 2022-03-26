import { combineReducers } from 'redux';

import currencyReducer from './Currency.reducer';

export const rootReducer = combineReducers({
  currency: currencyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
