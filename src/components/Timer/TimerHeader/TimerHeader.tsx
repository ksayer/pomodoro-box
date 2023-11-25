import React from 'react';
import styles from './TimerHeader.module.css';
import {useSelector} from "react-redux";
import {getTimerStatus} from "../../../store/slices/timer";

interface ITimerHeader {
  taskName: string,
  isBreak: boolean,
  finishedPomodoro: number,
}

export function TimerHeader({taskName, isBreak, finishedPomodoro}: ITimerHeader) {
  const status = useSelector(getTimerStatus);

  let styleHeader = '';
  if (isBreak) {
    styleHeader = styles['header--green']
  } else if (status !== 'isStop') {
    styleHeader = styles['header--red']
  }

  return (
    <div className={`${styles.header} ${styleHeader}`}>
      <span>{taskName}</span>
      <span>{isBreak ? `Перерыв ${finishedPomodoro || ""}` : `Помидор ${finishedPomodoro + 1}`}</span>
    </div>
  );
}


