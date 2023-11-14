import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "../ClockFace";
import {ManagePanel} from "../ManagePanel";
import {removeTask, TaskType, updateStatus, updateTask} from "../../../store/slices/tasks";
import {useDispatch, useSelector} from "react-redux";
import {POMODORO_START_SECONDS} from "../../../constants";
import {getGlobalCounter, updateGlobalCounter} from "../../../store/slices/counter";
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
  const globalCounter = useSelector(getGlobalCounter);
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);
  let finishedTasks = globalCounter.finishedTasks;

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
    dispatcher(updateStatus({id: currentTask?.id, active: false}))
  }

  const finishTask = () => {
    const nextIsBreak = !isBreak
    handlers.setIsBreak(nextIsBreak)
    if (nextIsBreak) {
      finishedTasks = globalCounter.finishedTasks + 1
      dispatcher(updateGlobalCounter({
        ...globalCounter,
        finishedTasks
      }));
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
    stopTimer(calculateNewSeconds(nextIsBreak, finishedTasks));
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
