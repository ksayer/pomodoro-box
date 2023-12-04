import React, {useState} from 'react';
import styles from './TimerBody.module.css';
import {ClockFace} from "./ClockFace";
import {ManagePanel} from "./ManagePanel";
import {removeTask, TaskType, updateStatus, updateTask} from "../../../store/slices/tasks";
import {useDispatch, useSelector} from "react-redux";
import {
  incrementFinishedTasks,
  getTodayStatistic, addTimeOnFinishedTasks,
} from "../../../store/slices/statistic";
import {getTimerStore, setSeconds, setStatus, toggleIsBreak} from "../../../store/slices/timer";
import {Notification} from "./Notification";
import {Settings} from "./Settings";
import {getSettings} from "../../../store/slices/settings";
interface ITimerBody {
  currentTask: TaskType,
  taskName: string,
}


export function TimerBody({currentTask, taskName}: ITimerBody) {
  const dispatcher = useDispatch();
  const {finishedTasks} = useSelector(getTodayStatistic);
  const {
    pomodoroDurationMinutes,
    longBreakDurationMinutes,
    pomodoroBetweenLongBreak,
    shortBreakDurationMinutes
  } = useSelector(getSettings)
  const {isBreak, status} = useSelector(getTimerStore);
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
    dispatcher(setStatus('isWork'));
    dispatcher(updateTask({...currentTask, active: true}))
  }

  const togglePause = () => {
    dispatcher(setStatus(status == 'isPause' ? 'isWork' : 'isPause'))
  }

  const stopTimer = (newSeconds: number) => {
    dispatcher(setStatus('isStop'))
    dispatcher(setSeconds(newSeconds));
    dispatcher(updateStatus({id: currentTask?.id, active: false}))
  }

  const updateCurrentTask = () => {
    dispatcher(addTimeOnFinishedTasks(currentTask.workingSecondsLastTask))
    dispatcher(
      currentTask.countPomodoro === 1 ?
        removeTask({id: currentTask.id})
        :
        updateTask({
          ...currentTask,
          countPomodoro: currentTask.countPomodoro - 1,
          finishedPomodoro: currentTask.finishedPomodoro + 1,
          active: false,
          workingSecondsLastTask: 0,
        }));
  }

  const finishTask = () => {
    let nextFinishedTasks = finishedTasks;
    const nextIsBreak = !isBreak
    dispatcher(toggleIsBreak())
    if (nextIsBreak) {
      nextFinishedTasks = finishedTasks + 1
      dispatcher(incrementFinishedTasks());
      if (currentTask) updateCurrentTask();
    }
    stopTimer(calculateNewSeconds(nextIsBreak, nextFinishedTasks));
    if (status !== 'isPause') {
      setShowNotification(true)
    }
  }

  return (
    <div className={styles.body}>
      <Settings/>
      <ClockFace
        key={currentTask?.id}
        handlers={{finishTask}}
        isStopDown={isStopDown}
        secondsOnUpdate={
          calculateNewSeconds(isBreak, finishedTasks)
        }
      />
      <div className={styles.description}>
        <span className={styles.description__text}>Задача 1 - </span>
        {taskName}
      </div>
      <ManagePanel
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
