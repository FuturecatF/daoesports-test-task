import { useTypedSelector } from '../useTypedSelector';

export const useCurrency = () => {
  const currencyState = useTypedSelector((state) => state.currency);

  return { ...currencyState };
};
