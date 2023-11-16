import React from 'react';
import styles from './ManagePanel.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getTimerStore, incrementStops} from "../../../../store/slices/counter";

interface IManagePanel {
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

export function ManagePanel({isBreak, secondsOnUpdate, pause, handlers}: IManagePanel) {
  const dispatcher = useDispatch();
  const { isRunning } = useSelector(getTimerStore);
  let leftBtnText = 'Старт'
  let rightBtnText = 'Стоп'
  const handleStop = () => {
    dispatcher(incrementStops())
    handlers.stopTimer(secondsOnUpdate)
  }
  let leftBtnHandler = () => handlers.startTimer()
  let rightBtnHandler = handleStop;

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
