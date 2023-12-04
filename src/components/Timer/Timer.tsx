import React, {useEffect, useState} from 'react';
import styles from './Timer.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";
import {TimerHeader} from "./TimerHeader";
import {TimerBody} from "./TimerBody";
import {setStatus} from "../../store/slices/timer";
import {getSettings} from "../../store/slices/settings";


export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const dispatcher = useDispatch();
  const taskName = currentTask?.name || "Создайте задачу";
  const {pomodoroDurationMinutes} = useSelector(getSettings);

  useEffect(() => {
    return () => {
      dispatcher(setStatus('isStop'));
    }
  }, []);

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <TimerHeader
          taskName={taskName}
          finishedPomodoro={currentTask?.finishedPomodoro || 0}
        />
        <TimerBody
          key={`${pomodoroDurationMinutes}`}
          currentTask={currentTask}
          taskName={taskName}
        />
      </div>
    </div>
  );
}
