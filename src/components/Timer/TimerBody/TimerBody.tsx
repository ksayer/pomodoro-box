import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './TimerBody.module.css';
import { ClockFace } from './ClockFace';
import { ManagePanel } from './ManagePanel';
import {
  addNewTask,
  removeTask,
  selectTasks,
  TaskType,
  updateStatus,
  updateTask,
} from '../../../store/slices/tasks';
import {
  incrementFinishedTasks,
  selectTodayStatistic,
  addTimeOnFinishedTasks,
} from '../../../store/slices/statistic';
import { selectTimerStore, setSeconds, setStatus, toggleIsBreak } from '../../../store/slices/timer';
import { Notification } from './Notification';
import { Settings } from './Settings';
import { selectSettings } from '../../../store/slices/settings';
import { getRandomString } from '../../../utils/randomString';
import { DEFAULT_TASK_NAME } from '../../../constants';

interface ITimerBody {
  currentTask: TaskType;
  taskName: string;
}

export function TimerBody({ currentTask, taskName }: ITimerBody) {
  const dispatcher = useDispatch();
  const { finishedTasks } = useSelector(selectTodayStatistic);
  const {
    pomodoroDurationMinutes,
    longBreakDurationMinutes,
    pomodoroBetweenLongBreak,
    shortBreakDurationMinutes,
  } = useSelector(selectSettings);
  const tasks = useSelector(selectTasks);
  const { isBreak, status } = useSelector(selectTimerStore);
  const [isStopDown, setIsStopDown] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState(false);

  const calculateNewSeconds = (isBreak: boolean, finishedTasks: number) => {
    if (!isBreak) {
      return pomodoroDurationMinutes * 60;
    }
    return finishedTasks % pomodoroBetweenLongBreak === 0
      ? longBreakDurationMinutes * 60
      : shortBreakDurationMinutes * 60;
  };

  const startTimer = () => {
    dispatcher(setStatus('isWork'));
    dispatcher(updateTask({ ...currentTask, active: true }));
    if (!tasks.length && !isBreak) {
      dispatcher(
        addNewTask({
          id: getRandomString(),
          name: DEFAULT_TASK_NAME,
          countPomodoro: 1,
          finishedPomodoro: 0,
          active: true,
          workingSecondsLastTask: 0,
          fake: true,
        }),
      );
    }
  };

  const stopTimer = (newSeconds: number) => {
    dispatcher(setStatus('isStop'));
    dispatcher(setSeconds(newSeconds));
    dispatcher(updateStatus({ id: currentTask?.id, active: false }));
    if (tasks[0]?.fake) {
      dispatcher(updateTask({ ...tasks[0], workingSecondsLastTask: 0 }));
    }
  };

  const updateCurrentTask = () => {
    dispatcher(addTimeOnFinishedTasks(currentTask.workingSecondsLastTask));
    dispatcher(
      currentTask.countPomodoro === 1
        ? removeTask({ id: currentTask.id })
        : updateTask({
            ...currentTask,
            countPomodoro: currentTask.countPomodoro - 1,
            finishedPomodoro: currentTask.finishedPomodoro + 1,
            active: false,
            workingSecondsLastTask: 0,
          }),
    );
  };

  const finishTask = () => {
    let nextFinishedTasks = finishedTasks;
    const nextIsBreak = !isBreak;
    dispatcher(toggleIsBreak());
    if (nextIsBreak) {
      nextFinishedTasks = finishedTasks + 1;
      dispatcher(incrementFinishedTasks());
      if (currentTask) updateCurrentTask();
    }
    stopTimer(calculateNewSeconds(nextIsBreak, nextFinishedTasks));
    if (status !== 'isPause') {
      setShowNotification(true);
    }
  };

  return (
    <div className={styles.body}>
      <Settings />
      <ClockFace
        key={currentTask?.id}
        handlers={{ finishTask }}
        isStopDown={isStopDown}
        secondsOnUpdate={calculateNewSeconds(isBreak, finishedTasks)}
      />
      <div className={styles.description}>
        <span className={styles.description__text}>Задача 1 - </span>
        {taskName}
      </div>
      <ManagePanel
        handlers={{
          stopTimer,
          startTimer,
          finishTask,
          setIsStopDown,
        }}
        secondsOnUpdate={calculateNewSeconds(isBreak, finishedTasks)}
      />
      <Notification
        setShowNotification={setShowNotification}
        showNotification={showNotification}
        text={isBreak ? 'Пора отдохнуть!' : 'Перерыв окончен!'}
      />
    </div>
  );
}
