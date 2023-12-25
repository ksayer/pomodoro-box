import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ManagePanel.module.css';
import { incrementStops } from 'store/slices/statistic';
import { selectTimerStore, setStatus } from 'store/slices/timer';

interface IManagePanel {
  secondsOnUpdate: number;
  handlers: {
    stopTimer: (v: number) => void;
    startTimer: () => void;
    finishTask: () => void;
    setIsStopDown: (isd: boolean) => void;
  };
}

export function ManagePanel({ secondsOnUpdate, handlers }: IManagePanel) {
  const dispatcher = useDispatch();
  const { isBreak, status } = useSelector(selectTimerStore);
  let leftBtnText = 'Старт';
  let rightBtnText = 'Стоп';

  const handleStop = () => {
    dispatcher(incrementStops());
    handlers.stopTimer(secondsOnUpdate);
  };

  const togglePause = () => {
    dispatcher(setStatus(status === 'isPause' ? 'isWork' : 'isPause'));
  };

  let leftBtnHandler = () => handlers.startTimer();
  let rightBtnHandler = handleStop;

  if (status === 'isWork') {
    leftBtnText = 'Пауза';
    leftBtnHandler = () => togglePause();
  } else if (status === 'isPause') {
    leftBtnText = 'Продолжить';
    rightBtnText = isBreak ? 'Пропустить' : 'Сделано';
    leftBtnHandler = () => togglePause();
    rightBtnHandler = () => handlers.finishTask();
  }

  return (
    <div className={styles.group_btn}>
      <button className="btn btn--green" onClick={leftBtnHandler}>
        {leftBtnText}
      </button>
      <button
        className={`btn ${styles['right-btn']}`}
        onClick={rightBtnHandler}
        disabled={status === 'isStop'}
        onMouseDown={() => handlers.setIsStopDown(true)}
        onMouseUp={() => handlers.setIsStopDown(false)}
        onMouseOutCapture={() => handlers.setIsStopDown(false)}
      >
        {rightBtnText}
      </button>
    </div>
  );
}
