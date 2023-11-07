import React from 'react';
import styles from './TasksList.module.css';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";

export function TasksList() {
  const tasks = useSelector(selectTasks);
  return (
    <div className={styles.tasks}>
      <ul className={styles.list}>
        {tasks.map((task) => <Task key={task.id} name={task.name} countPomodoro={task.countPomodoro}/>)}
      </ul>
      <span className={styles['total-time']}>1 час 15 мин</span>
    </div>
  );
}
