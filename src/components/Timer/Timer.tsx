import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Timer.module.css';
import { selectTasks } from '../../store/slices/tasks';
import { TimerHeader } from './TimerHeader';
import { TimerBody } from './TimerBody';
import { setStatus } from '../../store/slices/timer';
import { selectSettings } from '../../store/slices/settings';
import { DEFAULT_TASK_NAME } from '../../constants';

export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const dispatcher = useDispatch();
  const taskName = currentTask?.name || DEFAULT_TASK_NAME;
  const { pomodoroDurationMinutes } = useSelector(selectSettings);

  useEffect(
    () => () => {
      dispatcher(setStatus('isStop'));
    },
    [dispatcher],
  );

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <TimerHeader taskName={taskName} finishedPomodoro={currentTask?.finishedPomodoro || 0} />
        <TimerBody
          key={`${pomodoroDurationMinutes}`}
          currentTask={currentTask}
          taskName={taskName}
        />
      </div>
    </div>
  );
}
