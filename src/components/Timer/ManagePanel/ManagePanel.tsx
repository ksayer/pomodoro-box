import React from 'react';
import styles from './ManagePanel.module.css';
import {TaskType} from "../../../store/slices/tasks";
import {BREAK_SECONDS, POMODORO_START_SECONDS} from "../../../constants";

interface IManagePanel {
  isRunning: boolean,
  isBreak: boolean,
  pause: boolean,
  currentTask: TaskType,
  handlers: {
    stopTimer: (v: number) => void,
    startTimer: () => void
    togglePause: () => void
    finishTask: () => void
  }
}

export function ManagePanel({isRunning, isBreak, pause, handlers}: IManagePanel) {

  let leftBtnText = 'Старт'
  let rightBtnText = 'Стоп'
  let leftBtnHandler = () => handlers.startTimer()
  let rightBtnHandler = () => handlers.stopTimer(isBreak ? BREAK_SECONDS: POMODORO_START_SECONDS)

  if (isRunning) {
    leftBtnText = 'Пауза'
    leftBtnHandler = () => handlers.togglePause();
  } else if (pause) {
    leftBtnText = 'Продолжить'
    rightBtnText = isBreak ? 'Пропустить' : 'Сделано'
    leftBtnHandler = () => handlers.togglePause();
    rightBtnHandler = () => handlers.finishTask();
  }

  return (
    <div className={styles.group_btn}>
      <button
        className="btn btn--green"
        onClick={leftBtnHandler}
      >{leftBtnText}</button>
      <button
        className={`btn ${styles['right-btn']}`}
        onClick={rightBtnHandler}
        disabled={!isRunning && !pause}
      >{rightBtnText}</button>
    </div>
  );
}
