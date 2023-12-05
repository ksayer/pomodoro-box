import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './MainPage.module.css';
import { Instruction } from '../../components/Instruction';
import { NewTaskForm } from '../../components/NewTaskForm';
import { TasksList } from '../../components/TasksList';
import { Timer } from '../../components/Timer';
import { deactivateTasks } from '../../store/slices/tasks';

export function Main() {
  const dispatch = useDispatch();
  dispatch(deactivateTasks());
  return (
      <div className={styles.app}>
        <Instruction/>
        <NewTaskForm/>
        <TasksList/>
        <Timer/>
      </div>
  );
}
