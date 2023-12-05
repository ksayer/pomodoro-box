import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TimerHeader.module.css';
import { selectTimerStatus, selectTimerStore } from '../../../store/slices/timer';

interface ITimerHeader {
  taskName: string;
  finishedPomodoro: number;
}

export function TimerHeader({ taskName, finishedPomodoro }: ITimerHeader) {
  const { isBreak } = useSelector(selectTimerStore);
  const status = useSelector(selectTimerStatus);

  let styleHeader = '';
  if (isBreak) {
    styleHeader = styles['header--green'];
  } else if (status !== 'isStop') {
    styleHeader = styles['header--red'];
  }

  return (
    <div className={`${styles.header} ${styleHeader}`}>
      <span>{taskName}</span>
      <span>
        {isBreak ? `Перерыв ${finishedPomodoro || ''}` : `Помидор ${finishedPomodoro + 1}`}
      </span>
    </div>
  );
}
