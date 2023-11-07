import React from 'react';
import styles from './TasksList.module.css';
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {selectTasks} from "../../store/slices/tasks";
import {POMODORO_MINUTES} from "../../constants";


const getDurationString = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && !minutes) return `${hours} ч`;
  if (hours) return `${hours} ч ${minutes} минут`;
  return `${minutes} минут`;
}


export function TasksList() {
  const tasks = useSelector(selectTasks);
  const minutes = tasks.reduce(
    (accumulator, currentValue) => (
      accumulator + currentValue.countPomodoro * POMODORO_MINUTES
    ), 0)
  const timeString = getDurationString(minutes)
  return (
    <div className={styles.tasks}>
      <ul className={styles.list}>
        {tasks.map((task) => <Task key={task.id} name={task.name} countPomodoro={task.countPomodoro}/>)}
      </ul>
      <span className={styles['total-time']}>{minutes !== 0 && timeString}</span>
    </div>
  );
}
