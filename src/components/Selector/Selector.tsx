import React from 'react';
import styles from './Selector.module.css';

export function Selector() {
  return (
    <div className={styles.selector}>
      <button className={`${styles.btn} ${styles.main_btn}`}>
        Эта неделя
      </button>
      <div className={styles.list}>
        <button className={styles.btn}>Прошедшая неделя</button>
        <button className={styles.btn}>2 недели назад</button>
      </div>
    </div>
  );
}
