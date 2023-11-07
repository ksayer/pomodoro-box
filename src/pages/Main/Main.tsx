import React from 'react';
import styles from './MainPage.module.css';
import {Instruction} from "../../components/Instruction";
import {NewTaskForm} from "../../components/NewTaskForm";
import {TasksList} from "../../components/TasksList";
import {Timer} from "../../components/Timer";

export function Main() {
  return (
      <div className={styles.app}>
        <Instruction/>
        <NewTaskForm/>
        <TasksList/>
        <Timer/>
      </div>
  );
}
