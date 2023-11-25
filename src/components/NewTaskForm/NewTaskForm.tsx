import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './NewTaskForm.module.css';
import {useDispatch, useSelector} from "react-redux";
import {addNewTask} from "../../store/slices/tasks";
import {getRandomString} from "../../utils/randomString";
import {getTimerStatus} from "../../store/slices/timer";

export function NewTaskForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(getTimerStatus);
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const newTask = {id: getRandomString(), name: value, countPomodoro: 1, finishedPomodoro: 0, active: false}
    if (status !== 'isStop') newTask.active = true;
    dispatch(addNewTask(newTask))
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label htmlFor="new-task"></label>
      <input
        required={true}
        className={styles.input}
        id="new-task"
        name={'new'}
        type="text"
        placeholder="Название задачи"
        value={value}
        onChange={handleChange}
      />
      <button className="btn btn--green" type="submit">Добавить</button>
    </form>
  );
}
