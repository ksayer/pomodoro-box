import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "./ClockFace";
import {ManagePanel} from "./ManagePanel";
import {removeTask, TaskType, updateStatus, updateTask} from "../../../store/slices/tasks";
import {useDispatch, useSelector} from "react-redux";
import {POMODORO_START_SECONDS} from "../../../constants";
import {
  addWorkingTime,
  addPauseTime,
  incrementFinishedTasks,
  addTimeOnFinishedTasks,
  getTodayStatistic,
} from "../../../store/slices/statistic";
import {calculateNewSeconds} from "../calculateNewSeconds";
import {getTimerStore, setIsPause, setIsRunning} from "../../../store/slices/timer";

interface ITimerBody {
  currentTask: TaskType,
  isBreak: boolean,
  taskName: string,
  handlers: {
    setIsBreak: (v: boolean) => void,
  }
}


export function TimerBody({currentTask, isBreak, taskName, handlers}: ITimerBody) {
  const dispatcher = useDispatch();
  const {finishedTasks} = useSelector(getTodayStatistic);
  const { isRunning, isPause } = useSelector(getTimerStore);
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [spentOnPomodoroTime, setSpentOnPomodoroTime] = useState<number>(0);
  const [isStopDown, setIsStopDown] = useState<boolean>(false);

  const startTimer = () => {
    setStartedAt(Date.now())
    dispatcher(setIsRunning(true));
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    if (!isBreak && !isPause) setSpentOnPomodoroTime(spentOnPomodoroTime + Date.now() - startedAt)
    updateWorkingPauseTime();
    setStartedAt(Date.now())
    dispatcher(setIsPause(!isPause));
    dispatcher(setIsRunning(!isRunning));
  }

  const stopTimer = (newSeconds: number) => {
    updateWorkingPauseTime();
    dispatcher(setIsRunning(false));
    dispatcher(setIsPause(false));
    setSpentOnPomodoroTime(0)
    setSeconds(newSeconds);
    dispatcher(updateStatus({id: currentTask?.id, active: false}))
  }

  const finishTask = () => {
    updateTimeOnFinishedTasks();
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

  const updateWorkingPauseTime = () => {
    if (!isPause) {
      if (!isBreak) dispatcher(addWorkingTime(Date.now() - startedAt))
    } else {
      dispatcher(addPauseTime(Date.now() - startedAt))
    }
  }

  const updateTimeOnFinishedTasks = () => {
    if (!isBreak) {
      let spentTime;
      if (isPause)  {
        spentTime = spentOnPomodoroTime
      } else {
        spentTime = spentOnPomodoroTime + Date.now() - startedAt
      }
      dispatcher(addTimeOnFinishedTasks(spentTime));
    }
  }

  return (
    <div className={styles.body}>
      <ClockFace
        key={currentTask?.id}
        handlers={{setSeconds, finishTask}}
        seconds={seconds}
        isStopDown={isStopDown}
        isBreak={isBreak}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
      <div className={styles.description}>
        <span className={styles.description__text}>Задача 1 - </span>
        {taskName}
      </div>
      <ManagePanel
        isBreak={isBreak}
        pause={isPause}
        handlers={{stopTimer, startTimer, togglePause, finishTask, setIsStopDown}}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
    </div>
  );
}
