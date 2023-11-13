import React, {useState} from 'react';
import styles from './Timer.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks, updateTask} from "../../store/slices/tasks";
import {ClockFace} from "./ClockFace";


export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const [isRunning, setIsRunning] = useState(false);
  const dispatcher = useDispatch();
  const taskName = currentTask?.name || "Создайте задачу";

  const startTimer = () => {
    setIsRunning(true);
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const stopTimer = () => {
    setIsRunning(false);
    dispatcher(updateTask({...currentTask, active: false}))
  }

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <div className={`${styles.header} ${isRunning ? styles['header--active'] : ""}`}>
          <span>{taskName}</span>
          <span>Помидор 1</span>
        </div>
        <div className={styles.body}>
          <ClockFace isRunning={isRunning} currentTask={currentTask} stopHandler={stopTimer}/>
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
