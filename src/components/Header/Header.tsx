import React from 'react';
import cl from 'classnames';

import i18n from 'src/utils/i18next';

import styles from './Header.module.scss';

export const Header: React.FC = (): JSX.Element => {
  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  const changeLanguageRU = () => {
    changeLanguage('ru');
  };

  const changeLanguageEN = () => {
    changeLanguage('en');
  };

  return (
    <header className={cl(styles['header'])}>
      <ul className={cl(styles['header__list'])}>
        <li className={cl(styles['header__item'])}>
          <button className={cl(styles['header__button'])} type="button" onClick={changeLanguageRU}>
            RU
          </button>
        </li>
        <li>
          <button className={cl(styles['header__button'])} type="button" onClick={changeLanguageEN}>
            EN
          </button>
        </li>
      </ul>
      <h1 className={cl(styles['header__text'])}>Конвертер валют</h1>
    </header>
  );
};
