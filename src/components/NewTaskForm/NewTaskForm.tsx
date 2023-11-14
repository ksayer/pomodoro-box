import React, {ChangeEvent, FormEvent, useState} from 'react';
import styles from './NewTaskForm.module.css';
import {useDispatch} from "react-redux";
import {addNewTask} from "../../store/slices/tasks";
import {getRandomString} from "../../utils/randomString";

export function NewTaskForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    dispatch(addNewTask({id: getRandomString(), name: value, countPomodoro: 1, finishedPomodoro: 0}))
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
