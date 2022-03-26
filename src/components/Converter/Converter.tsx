import React from 'react';
import cl from 'classnames';

import { ConverterForm } from 'src/components';

import styles from './Converter.module.scss';

export const Converter: React.FC = (): JSX.Element => (
  <section className={cl(styles['converter'])}>
    <ConverterForm />
  </section>
);
