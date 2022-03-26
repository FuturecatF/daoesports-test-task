import React, { useState, useEffect, useCallback } from 'react';
import cl from 'classnames';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';

import { useCurrency } from 'src/hooks';

import { rounded } from 'src/utils';
import { ChangeModificator } from 'src/types';

import styles from './ConverterForm.module.scss';

export const ConverterForm: React.FC = (): JSX.Element => {
  const { t } = useTranslation();
  const { currencyObject } = useCurrency();

  const [isCurrencyArray, setIsCurrencyArray] = useState<string[]>();
  const [isChangingCurrencyKey, setIsChangingCurrencyKey] = useState<string>('');
  const [isChangingCurrencyValue, setIsChangingCurrencyValue] = useState<number>();
  const [isGetCurrencyKey, setIsGetCurrencyKey] = useState<string>('');
  const [isGetCurrencyValue, setIsGetCurrencyValue] = useState<number>();

  const handleChangeChanging = (event: SelectChangeEvent) => {
    setIsChangingCurrencyKey(event.target.value);

    if (currencyObject) {
      Object.entries(currencyObject.rates).filter((item) => {
        if (item[0] === event.target.value) {
          setIsChangingCurrencyValue(item[1]);
        }
        return null;
      });
    }
  };

  const handleChangeGet = (event: SelectChangeEvent) => {
    setIsGetCurrencyKey(event.target.value);
    if (currencyObject) {
      Object.entries(currencyObject.rates).filter((item) => {
        if (item[0] === event.target.value) {
          setIsGetCurrencyValue(item[1]);
        }
        return null;
      });
    }
  };

  useEffect(() => {
    if (currencyObject) {
      setIsCurrencyArray(Object.keys(currencyObject.rates));
    }
  }, [currencyObject]);

  const [isChangingValue, setIsChangingValue] = useState<string>('');
  const [isGetValue, setIsGetValue] = useState<string>('');
  const [isChangeInput, setIsChangeInput] = useState<ChangeModificator | null>(null);

  const handleChangeGetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsGetValue(e.target.value);
    getCurrencyChanging('get');
    setIsChangeInput('get');
  };

  const handleChangeChangingValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChangingValue(e.target.value);
    getCurrencyChanging('changing');
    setIsChangeInput('changing');
  };

  const getCurrencyChanging = useCallback(
    (modificator: ChangeModificator) => {
      if (modificator === 'changing') {
        const value = Number(isChangingValue);
        if (isChangingCurrencyValue && isGetCurrencyValue) {
          const getValueCurrency = (isGetCurrencyValue / isChangingCurrencyValue) * value;
          setIsGetValue(String(rounded(getValueCurrency)));
        }
      } else if (modificator === 'get') {
        const value = Number(isGetValue);
        if (isChangingCurrencyValue && isGetCurrencyValue) {
          const getValueCurrency = (isChangingCurrencyValue / isGetCurrencyValue) * value;

          setIsChangingValue(String(rounded(getValueCurrency)));
        }
      }
    },
    [isChangingCurrencyValue, isChangingValue, isGetCurrencyValue, isGetValue]
  );

  useEffect(() => {
    if (isChangeInput === 'changing' && isChangingCurrencyValue && isGetCurrencyValue) {
      getCurrencyChanging('changing');
    } else if (isChangeInput === 'get' && isChangingCurrencyValue && isGetCurrencyValue) {
      getCurrencyChanging('get');
    }
  }, [getCurrencyChanging, isChangingCurrencyValue, isGetCurrencyValue, isChangeInput]);

  return (
    <form className={cl(styles['converter-form'])} noValidate>
      <ul className={cl(styles['converter-form__list'])}>
        <li className={cl(styles['converter-form__item'])}>
          <div className={cl(styles['converter-form__input-container'])}>
            <label className={cl(styles['converter-form__label'])} htmlFor="changing-input">
              {t('labels.changing')}
            </label>
            <input
              className={cl(styles['converter-form__input'])}
              type="number"
              id="changing-input"
              onChange={handleChangeChangingValue}
              value={isChangingValue}
            />
          </div>
          <FormControl sx={{ m: 0, width: 120, p: 0 }}>
            <Select
              value={isChangingCurrencyKey}
              onChange={handleChangeChanging}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ p: 0 }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isCurrencyArray &&
                isCurrencyArray.length > 0 &&
                isCurrencyArray?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </li>
        <li className={cl(styles['converter-form__item'])}>
          <div className={cl(styles['converter-form__input-container'])}>
            <label className={cl(styles['converter-form__label'])} htmlFor="get-input">
              {t('labels.get')}
            </label>
            <input
              className={cl(styles['converter-form__input'])}
              type="number"
              id="get-input"
              onChange={handleChangeGetValue}
              value={isGetValue}
            />
          </div>
          <FormControl sx={{ m: 0, width: 120 }}>
            <Select
              value={isGetCurrencyKey}
              onChange={handleChangeGet}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {isCurrencyArray &&
                isCurrencyArray.length > 0 &&
                isCurrencyArray?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </li>
      </ul>
    </form>
  );
};
