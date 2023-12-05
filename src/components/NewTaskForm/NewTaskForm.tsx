import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './NewTaskForm.module.css';
import { addNewTask, selectTasks, updateTask } from 'store/slices/tasks';
import { getRandomString } from 'utils/randomString';
import { selectTimerStatus } from 'store/slices/timer';

export function NewTaskForm() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const status = useSelector(selectTimerStatus);
  const tasks = useSelector(selectTasks);
  const [errorMessage, setErrorMessage] = useState<string>('');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setErrorMessage('');
    setValue(event.target.value);
  }
  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (tasks.find(obj => obj.name === value)) {
      setErrorMessage('Такая задача уже есть в списке');
      return;
    }

    if (tasks[0]?.fake) {
      dispatch(updateTask({ ...tasks[0], fake: false, name: value }));
    } else {
      const newTask = {
        id: getRandomString(),
        name: value,
        countPomodoro: 1,
        finishedPomodoro: 0,
        active: false,
        fake: false,
        workingSecondsLastTask: 0,
      };
      if (status !== 'isStop' && !tasks.length) {
        newTask.active = true;
      }
      dispatch(addNewTask(newTask));
    }
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
        aria-invalid={!!errorMessage}
      />
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      <button className="btn btn--green" type="submit">
        Добавить
      </button>
    </form>
  );
}
