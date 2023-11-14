import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "../ClockFace";
import {ManagePanel} from "../ManagePanel";
import {removeTask, TaskType, updateTask} from "../../../store/slices/tasks";
import {useDispatch} from "react-redux";
import {BREAK_SECONDS, POMODORO_START_SECONDS} from "../../../constants";

interface ITimerBody {
  currentTask: TaskType,
  isRunning: boolean,
  isPause: boolean,
  isBreak: boolean,
  taskName: string,
  handlers: {
    setIsRunning: (v: boolean) => void,
    setIsPause: (v: boolean) => void,
    setIsBreak: (v: boolean) => void,
  }
}

export function TimerBody({currentTask, isPause, isBreak, isRunning, taskName, handlers}: ITimerBody) {
  const dispatcher = useDispatch();
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);

  const startTimer = () => {
    handlers.setIsRunning(true);
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    handlers.setIsPause(!isPause);
    handlers.setIsRunning(!isRunning);
  }

  const stopTimer = (newSeconds: number) => {
    handlers.setIsRunning(false);
    handlers.setIsPause(false);
    setSeconds(newSeconds);
    dispatcher(updateTask({...currentTask, active: false}))
  }

  const finishTask = () => {
    handlers.setIsBreak(!isBreak)
    stopTimer(isBreak ? POMODORO_START_SECONDS : BREAK_SECONDS);
    if (currentTask && !isBreak) {
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
        handlers={{setSeconds, finishTask}}
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
        isBreak={isBreak}
        pause={isPause}
        handlers={{stopTimer, startTimer, togglePause, finishTask}}
      />
    </div>
  );
}
