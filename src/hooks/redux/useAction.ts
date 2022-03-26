import { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';

import { CurrencyActions } from 'src/store/actions';

const actions = {
  ...CurrencyActions
};

export const useAction = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
