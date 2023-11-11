import React, {useEffect, useState} from 'react';
import styles from './Timer.module.css';
import {Icon} from "../Icon";
import {useDispatch, useSelector} from "react-redux";
import {removeTask, selectTasks, updateTask} from "../../store/slices/tasks";
import {ClockFace} from "./ClockFace";
import {reduceSecond, resetTime} from "../../store/slices/timer";


function useIntervalCleanupBeforeUnmount(intervalId: ReturnType<typeof setInterval> | null) {
  useEffect(() => {
    return () =>  {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [intervalId])
}

export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const dispatcher = useDispatch();
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);
  const taskName = currentTask?.name || "Создайте задачу"
  useIntervalCleanupBeforeUnmount(intervalId)

  const startTimer = () => {
    if (intervalId) return;
    dispatcher(updateTask({...currentTask, active: true}))
    setIntervalId(setInterval(
      () => {
        dispatcher(reduceSecond())
      },
      1000))
  }

  const stopTimer = () => {
    if (!intervalId) return;
    clearInterval(intervalId);
    setIntervalId(null);
    dispatcher(updateTask({...currentTask, active: false}))
  }

  const resetTimer = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    stopTimer();
    dispatcher(resetTime())
  }

  function clearTimerOnExceedsTime() {
    stopTimer();
    setTimeout(() => dispatcher(resetTime()), 500)
    if (currentTask) {
      const id = currentTask.id;
      dispatcher(
        currentTask.countPomodoro === 1 ? removeTask({ id })
          : updateTask({...currentTask, countPomodoro: currentTask.countPomodoro - 1, active: false}));
    }
  }

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <div className={`${styles.header} ${intervalId ? styles['header--active'] : ""}`}>
          <span>{taskName}</span>
          <span>Помидор 1</span>
        </div>
        <div className={styles.body}>
          <div className={styles['counter-container']}>
            <ClockFace stopHandler={clearTimerOnExceedsTime}/>
            <button
              className={styles['uptime-btn']}
              onClick={resetTimer}
            >
              <Icon name={"filledPlus"} className={styles['plus-color']}/>
            </button>
          </div>
          <div className={styles.description}>
            <span className={styles.description__text}>Задача 1 - </span>
            {taskName}
          </div>
          <div className={styles.group_btn}>
            <button
              className="btn btn--green"
              onClick={startTimer}
            >Старт</button>
            <button
              className={`btn ${styles['right-btn']}`}
              onClick={stopTimer}
            >Стоп</button>
          </div>
        </div>
      </div>
    </div>
  );
}
