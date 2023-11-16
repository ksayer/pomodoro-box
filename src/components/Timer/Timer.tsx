import React, {useEffect, useState} from 'react';
import styles from './Timer.module.css';
import {useDispatch, useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";
import {TimerHeader} from "./TimerHeader";
import {TimerBody} from "./TimerBody";
import {setIsPause, setIsRunning} from "../../store/slices/timer";


export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const [isBreak, setIsBreak] = useState(false);
  const dispatcher = useDispatch();
  const taskName = currentTask?.name || "Создайте задачу";

  useEffect(() => {
    return () => {
      dispatcher(setIsRunning(false));
      dispatcher(setIsPause(false));
    }
  }, []);

  return (
    <div className={styles['timer-wrapper']}>
      <div>
        <TimerHeader
          taskName={taskName}
          isBreak={isBreak}
          finishedPomodoro={currentTask?.finishedPomodoro || 0}
        />
        <TimerBody
          currentTask={currentTask}
          isBreak={isBreak}
          taskName={taskName}
          handlers={{setIsBreak}}
        />
      </div>
    </div>
  );
}
