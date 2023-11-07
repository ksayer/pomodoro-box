import React from 'react';
import styles from './TextCard.module.css';

export function TextCard() {
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>Понедельник</h3>
      <p className={styles.card__text}>Вы работали над задачами в течениe
        <b className={styles['card__text--red']}> 51 минуты</b>
      </p>
    </div>
  );
}
