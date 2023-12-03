import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "./ClockFace";
import {ManagePanel} from "./ManagePanel";
import {removeTask, TaskType, updateStatus, updateTask} from "../../../store/slices/tasks";
import {useDispatch, useSelector} from "react-redux";
import {
  addWorkingTime,
  addPauseTime,
  incrementFinishedTasks,
  addTimeOnFinishedTasks,
  getTodayStatistic,
} from "../../../store/slices/statistic";
import {getTimerStatus, setStatus} from "../../../store/slices/timer";
import {Notification} from "./Notification";
import {Settings} from "./Settings";
import {getSettings} from "../../../store/slices/settings";
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
  const {
    pomodoroDurationMinutes,
    longBreakDurationMinutes,
    pomodoroBetweenLongBreak,
    shortBreakDurationMinutes
  } = useSelector(getSettings)
  const status = useSelector(getTimerStatus);
  const [seconds, setSeconds] = useState(pomodoroDurationMinutes * 60);
  const [startedAt, setStartedAt] = useState<number>(0);
  const [spentOnPomodoroTime, setSpentOnPomodoroTime] = useState<number>(0);
  const [isStopDown, setIsStopDown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState(false);
  const calculateNewSeconds = (isBreak: boolean, finishedTasks: number) => {
    if (!isBreak) {
      return pomodoroDurationMinutes * 60
    } else {
      return finishedTasks % pomodoroBetweenLongBreak === 0 ? longBreakDurationMinutes * 60 : shortBreakDurationMinutes * 60;
    }
  }

  const startTimer = () => {
    setStartedAt(Date.now())
    dispatcher(setStatus('isWork'));
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    if (!isBreak && status !== 'isPause') setSpentOnPomodoroTime(spentOnPomodoroTime + Date.now() - startedAt)
    updateWorkingPauseTime();
    setStartedAt(Date.now())
    dispatcher(setStatus(status == 'isPause' ? 'isWork' : 'isPause'))
  }

  const stopTimer = (newSeconds: number) => {
    updateWorkingPauseTime();
    dispatcher(setStatus('isStop'))
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
    if (status !== 'isPause') {
      setShowNotification(true)
    }
  }

  const updateWorkingPauseTime = () => {
    if (status !== 'isPause') {
      if (!isBreak) dispatcher(addWorkingTime(Date.now() - startedAt))
    } else {
      dispatcher(addPauseTime(Date.now() - startedAt))
    }
  }

  const updateTimeOnFinishedTasks = () => {
    if (!isBreak) {
      let spentTime;
      if (status === 'isPause')  {
        spentTime = spentOnPomodoroTime
      } else {
        spentTime = spentOnPomodoroTime + Date.now() - startedAt
      }
      dispatcher(addTimeOnFinishedTasks(spentTime));
    }
  }

  return (
    <div className={styles.body}>
      <Settings/>
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
        handlers={{stopTimer, startTimer, togglePause, finishTask, setIsStopDown}}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        text={isBreak ? 'Пора отдохнуть!': 'Перерыв окончен!' }
      />
    </div>
  );
}
