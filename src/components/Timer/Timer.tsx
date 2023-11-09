import React from 'react';
import styles from './Timer.module.css';
import {Icon} from "../Icon";
import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";
import {ClockFace} from "./ClockFace";
import {reduce} from "../../store/slices/timer";

export function Timer() {
  const tasks = useSelector(selectTasks);
  const taskName = tasks[0]?.name || "Создайте задачу"
  const dispatcher = useDispatch()
  let interval: ReturnType<typeof setInterval> | null = null;
  const startTimer = () => {
    interval = setInterval(() =>dispatcher(reduce()), 1000)
  }

  const stopTimer = () => {
    if (!interval) return;
    clearInterval(interval);
  }

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <div className={styles.header}>
          <span>{taskName}</span>
          <span>Помидор 1</span>
        </div>
        <div className={styles.body}>
          <div className={styles['counter-container']}>
            <ClockFace/>
            <button className={styles['uptime-btn']}>
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
