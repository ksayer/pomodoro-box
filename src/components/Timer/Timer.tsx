import React, {useState} from 'react';
import styles from './Timer.module.css';
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";
import {TimerHeader} from "./TimerHeader";
import {TimerBody} from "./TimerBody";


export function Timer() {
  const currentTask = useSelector(selectTasks)[0];
  const [isBreak, setIsBreak] = useState(false);
  const taskName = currentTask?.name || "Создайте задачу";

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
