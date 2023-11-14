import React from 'react';
import styles from './TimerHeader.module.css';

interface ITimerHeader {
  taskName: string,
  isBreak: boolean,
  isPause: boolean,
  isRunning: boolean,
  finishedPomodoro: number,
}

export function TimerHeader({taskName, isRunning, isBreak, isPause, finishedPomodoro}: ITimerHeader) {
  let styleHeader = '';
  if (isBreak) {
    styleHeader = styles['header--green']
  } else if (isRunning || isPause) {
    styleHeader = styles['header--red']
  }

  return (
    <div className={`${styles.header} ${styleHeader}`}>
      <span>{taskName}</span>
      <span>{isBreak ? `Перерыв ${finishedPomodoro || ""}` : `Помидор ${finishedPomodoro + 1}`}</span>
    </div>
  );
}


