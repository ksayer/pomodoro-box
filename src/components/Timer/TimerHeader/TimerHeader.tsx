import React from 'react';
import styles from './TimerHeader.module.css';
import {useSelector} from "react-redux";
import {getTimerStore} from "../../../store/slices/timer";

interface ITimerHeader {
  taskName: string,
  isBreak: boolean,
  finishedPomodoro: number,
}

export function TimerHeader({taskName, isBreak, finishedPomodoro}: ITimerHeader) {
  const { isRunning, isPause } = useSelector(getTimerStore);

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


