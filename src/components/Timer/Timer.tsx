import React from 'react';
import styles from './Timer.module.css';
import {Icon} from "../Icon";

export function Timer() {
  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <div className={styles.header}>
          <span>Сверстать сайт</span>
          <span>Помидор 1</span>
        </div>
        <div className={styles.body}>
          <div className={styles['counter-container']}>
            <span className={styles.counter}>25:00</span>
            <button className={styles['uptime-btn']}>
              <Icon name={"filledPlus"} className={styles['plus-color']}/>
            </button>
          </div>
          <div className={styles.description}>
            <span className={styles.description__text}>Задача 1 - </span>
            Сверстать сайт
          </div>
          <div className={styles.group_btn}>
            <button className="btn btn--green">Старт</button>
            <button className={`btn ${styles['right-btn']}`}>Стоп</button>
          </div>
        </div>
      </div>
    </div>
  );
}
