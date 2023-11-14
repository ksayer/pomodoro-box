import React from 'react';
import styles from './ManagePanel.module.css';

interface IManagePanel {
  isRunning: boolean,
  isBreak: boolean,
  pause: boolean,
  secondsOnUpdate: number,
  handlers: {
    stopTimer: (v: number) => void,
    startTimer: () => void
    togglePause: () => void
    finishTask: () => void
  }
}

export function ManagePanel({isRunning, isBreak, secondsOnUpdate, pause, handlers}: IManagePanel) {
  let leftBtnText = 'Старт'
  let rightBtnText = 'Стоп'
  let leftBtnHandler = () => handlers.startTimer()
  let rightBtnHandler = () => handlers.stopTimer(secondsOnUpdate)

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
