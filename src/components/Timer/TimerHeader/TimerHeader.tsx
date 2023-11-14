import React from 'react';
import styles from './TimerHeader.module.css';

interface ITimerHeader {
  taskName: string,
  pause: boolean,
  isRunning: boolean,
  finishedPomodoro: number,
}

export function TimerHeader({taskName, isRunning, pause, finishedPomodoro}: ITimerHeader) {
  let styleHeader = '';
  if (pause) {
    styleHeader = styles['header--green']
  } else if (isRunning) {
    styleHeader = styles['header--red']
  }

  return (
    <div className={`${styles.header} ${styleHeader}`}>
      <span>{taskName}</span>
      <span>Помидор {finishedPomodoro + 1}</span>
    </div>
  );
}


