import React from 'react';
import styles from './TimerHeader.module.css';
import {TaskType} from "../../../store/slices/tasks";
import {Simulate} from "react-dom/test-utils";

interface ITimerHeader {
  taskName: string,
  pause: boolean,
  isRunning: boolean,
}

export function TimerHeader({taskName, isRunning, pause}: ITimerHeader) {
  let styleHeader = '';
  console.log(pause)
  if (pause) {
    styleHeader = styles['header--green']
  } else if (isRunning) {
    styleHeader = styles['header--red']
  }

  return (
    <div className={`${styles.header} ${styleHeader}`}>
      <span>{taskName}</span>
      <span>Помидор 1</span>
    </div>
  );
}


