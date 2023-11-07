import React from 'react';
import styles from './PomodoroCard.module.css';
import {Icon} from "../Icon";

export function PomodoroCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <Icon name={"tomato"}/>
        <span className={styles.card__count}>x 2</span>
      </div>
      <p className={styles.card__footer}>2 помидора</p>
    </div>
  );
}
