import React from 'react';
import styles from './WideCard.module.css';
import {Icon} from "../Icon";

export function WideCard() {
  return (
    <div className={`${styles.card}`}>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>
          Фокус
        </h3>
        <p className={styles.card__text}>
          35%
        </p>
      </div>
      <Icon name={"focus"} className={styles.card__svg}/>
    </div>
  );
}
