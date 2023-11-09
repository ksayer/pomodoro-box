import React, {Dispatch, EventHandler, RefObject, SetStateAction, useState} from 'react';
import styles from './Menu.module.css';
import {Icon} from "../../../Icon";
import {Dropdown} from "../../../Dropdown";
import {updateCountPomodoro, removeTask, TaskType} from "../../../../store/slices/tasks";
import {useDispatch} from "react-redux";

export function Menu(
  {task, setEditing}: {
    task: TaskType,
    setEditing: Dispatch<SetStateAction<boolean>>},
) {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const addPomodoro = () => {
    dispatch(updateCountPomodoro({id: task.id, number: 1}))
  }

  const removePomodoro = () => {
    dispatch(updateCountPomodoro({id: task.id, number: -1}))
  }

  const deleteTask = () => {
    dispatch(removeTask({id: task.id}))
  }

  return (
    <>
      <Dropdown
        button={<Icon name={"menu"} className={styles.icon}/>}
        buttonStyles={styles['main-btn']}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      >
        <ul className={styles.menu}>
          <li>
            <button className={styles.btn} onClick={addPomodoro}>
              <Icon name={"plus"} className={styles.svg}/>
              <span>Увеличить</span>
            </button>
          </li>
          <li>
            <button className={styles.btn} onClick={removePomodoro} disabled={task.countPomodoro === 1}>
              <Icon name={"minus"} className={styles.svg}/>
              <span>Уменьшить</span>
            </button>
          </li>
          <li>
            <button className={styles.btn} onClick={() => {
              setEditing(true);
            }}>
              <Icon name={"edit"} className={styles.svg}/>
              <span>Редактировать</span>
            </button>
          </li>
          <li>
            <button className={styles.btn} onClick={deleteTask}>
              <Icon name={"delete"} className={styles.svg}/>
              <span>Удалить</span>
            </button>
          </li>
        </ul>
      </Dropdown>
    </>
  );
}
