import React, {useState} from 'react';
import styles from './Timer.module.css';
import {useDispatch, useSelector} from "react-redux";
import {removeTask, selectTasks, updateTask} from "../../store/slices/tasks";
import {ClockFace} from "./ClockFace";
import {ManagePanel} from "./ManagePanel";
import {TimerHeader} from "./TimerHeader";


export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const [isRunning, setIsRunning] = useState(false);
  const [pause, setPause] = useState(false);
  const dispatcher = useDispatch();
  const taskName = currentTask?.name || "Создайте задачу";

  const startTimer = () => {
    setIsRunning(true);
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const pauseTimer = () => {
    setPause(true);
    setIsRunning(false);
  }

  const unpauseTimer = () => {
    setPause(false);
    setIsRunning(true);
  }

  const stopTimer = () => {
    setIsRunning(false);
    setPause(false);
    dispatcher(updateTask({...currentTask, active: false}))
  }

  const finishTask = () => {
    if (currentTask) {
      const id = currentTask.id;
      dispatcher(
        currentTask.countPomodoro === 1 ? removeTask({id})
          : updateTask({...currentTask, countPomodoro: currentTask.countPomodoro - 1, active: false}));
    }
  }

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <TimerHeader taskName={taskName} isRunning={isRunning} pause={pause}/>
        <div className={styles.body}>
          <ClockFace
            key={currentTask.id}
            isRunning={isRunning}
            stopHandler={stopTimer}
            finishTask={finishTask}
          />
          <div className={styles.description}>
            <span className={styles.description__text}>Задача 1 - </span>
            {taskName}
          </div>
          <ManagePanel
            currentTask={currentTask}
            isRunning={isRunning}
            pause={pause}
            handlers={{stopTimer, startTimer, pauseTimer, unpauseTimer, finishTask}}
          />
        </div>
      </div>
    </div>
  );
}
