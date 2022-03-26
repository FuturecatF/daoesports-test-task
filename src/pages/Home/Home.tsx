import React, { useEffect } from 'react';
import cl from 'classnames';

import { useAction } from 'src/hooks';

import { Converter } from 'src/components';

import styles from './Home.module.scss';

export const Home: React.FC = (): JSX.Element => {
  const { getCurrency } = useAction();

  useEffect(() => {
    getCurrency();
  }, [getCurrency]);

  return (
    <main className={cl(styles['home-main'])}>
      <Converter />
    </main>
  );
};
