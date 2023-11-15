import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "../ClockFace";
import {ManagePanel} from "../ManagePanel";
import {removeTask, TaskType, updateStatus, updateTask} from "../../../store/slices/tasks";
import {useDispatch, useSelector} from "react-redux";
import {POMODORO_START_SECONDS} from "../../../constants";
import {
  addWorkingTime,
  addPauseTime,
  getGlobalCounter,
  incrementFinishedTasks
} from "../../../store/slices/counter";
import {calculateNewSeconds} from "../calculateNewSeconds";

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
  const {finishedTasks} = useSelector(getGlobalCounter);
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);
  const [startedAt, setStartedAt] = useState<number>(0)

  const startTimer = () => {
    setStartedAt(Date.now())
    handlers.setIsRunning(true);
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    updateGlobalCounter();
    setStartedAt(Date.now())
    handlers.setIsPause(!isPause);
    handlers.setIsRunning(!isRunning);
  }

  const stopTimer = (newSeconds: number) => {
    updateGlobalCounter();
    handlers.setIsRunning(false);
    handlers.setIsPause(false);
    setSeconds(newSeconds);
    dispatcher(updateStatus({id: currentTask?.id, active: false}))
  }

  const finishTask = () => {
    let nextFinishedTasks = finishedTasks;
    const nextIsBreak = !isBreak
    handlers.setIsBreak(nextIsBreak)
    if (nextIsBreak) {
      nextFinishedTasks = finishedTasks + 1
      dispatcher(incrementFinishedTasks());
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
    stopTimer(calculateNewSeconds(nextIsBreak, nextFinishedTasks));
  }

  const updateGlobalCounter = () => {
    if (!isPause) {
      dispatcher(addWorkingTime(Date.now() - startedAt))
    } else {
      dispatcher(addPauseTime(Date.now() - startedAt))
    }
  }

  return (
    <div className={styles.body}>
      <ClockFace
        key={currentTask?.id}
        handlers={{setSeconds, finishTask}}
        isRunning={isRunning}
        seconds={seconds}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
      <div className={styles.description}>
        <span className={styles.description__text}>Задача 1 - </span>
        {taskName}
      </div>
      <ManagePanel
        isRunning={isRunning}
        isBreak={isBreak}
        pause={isPause}
        handlers={{stopTimer, startTimer, togglePause, finishTask}}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
    </div>
  );
}
