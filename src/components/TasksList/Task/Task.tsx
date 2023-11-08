import React, {FC} from 'react';
import styles from './Task.module.css';
import {Icon} from "../../Icon";
import {Menu} from "./Menu";
import {TaskType} from "../../../store/slices/tasks";


export const Task: FC<{task: TaskType}> = ({task}) => {
  return (
    <li className={styles.item}>
      <div className={styles.counter}>{task.countPomodoro}</div>
      <span className={styles.name}>{task.name}</span>
      <Menu task={task}/>
    </li>
  );
}

