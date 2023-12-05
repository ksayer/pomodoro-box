import React from 'react';
import styles from './Chart.module.css';
import { Bars } from './Bars';

export function Chart() {
  return (
    <div className={styles.chart}>
      <div className={styles.chart__top}>
        <div className={styles.line}>
          <span className={styles.time}>1 ч 40 мин</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>1 ч 15 мин</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>50 мин</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>25 мин</span>
        </div>
        <Bars />
      </div>
      <div className={styles.chart__footer}></div>
    </div>
  );
}
