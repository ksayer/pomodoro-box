import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "../ClockFace";
import {ManagePanel} from "../ManagePanel";
import {removeTask, TaskType, updateTask} from "../../../store/slices/tasks";
import {useDispatch} from "react-redux";
import {POMODORO_START_SECONDS} from "../../../constants";

interface ITimerBody {
  currentTask: TaskType,
  isRunning: boolean,
  pause: boolean,
  taskName: string,
  handlers: {
    setIsRunning: (v: boolean) => void,
    setPause: (v: boolean) => void,
  }
}

export function TimerBody({currentTask, pause, isRunning, taskName, handlers}: ITimerBody) {
  const dispatcher = useDispatch();
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);

  const startTimer = () => {
    handlers.setIsRunning(true);
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    handlers.setPause(!pause);
    handlers.setIsRunning(!isRunning);
  }

  const stopTimer = () => {
    handlers.setIsRunning(false);
    handlers.setPause(false);
    setSeconds(POMODORO_START_SECONDS);
    dispatcher(updateTask({...currentTask, active: false}))
  }

  const finishTask = () => {
    handlers.setPause(false);
    setSeconds(POMODORO_START_SECONDS);
    if (currentTask) {
      dispatcher(
        currentTask.countPomodoro === 1 ?
          removeTask({id: currentTask.id})
          :
          updateTask({
            ...currentTask,
            countPomodoro: currentTask.countPomodoro - 1,
            finishedPomodoro: currentTask.finishedPomodoro + 1,
            active: false
          }));
    }
  }

  return (
    <div className={styles.body}>
      <ClockFace
        key={currentTask?.id}
        handlers={{setSeconds, stopHandler: stopTimer, finishTask}}
        isRunning={isRunning}
        seconds={seconds}
      />
      <div className={styles.description}>
        <span className={styles.description__text}>Задача 1 - </span>
        {taskName}
      </div>
      <ManagePanel
        currentTask={currentTask}
        isRunning={isRunning}
        pause={pause}
        handlers={{stopTimer, startTimer, togglePause, finishTask}}
      />
    </div>
  );
}
