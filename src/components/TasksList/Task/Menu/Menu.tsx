import React, {Dispatch, EventHandler, RefObject, SetStateAction, useState} from 'react';
import styles from './Menu.module.css';
import {Icon} from "../../../Icon";
import {Dropdown} from "../../../Dropdown";
import {updateCountPomodoro, removeTask, TaskType} from "../../../../store/slices/tasks";
import {useDispatch} from "react-redux";
import {IconName} from "../../../../svg-icons";


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

  const menuButtons: {name: string, iconName: IconName, onClick: () => void}[] = [
    {name: 'Увеличить', iconName: 'plus', onClick: addPomodoro},
    {name: 'Уменьшить', iconName: 'minus', onClick: removePomodoro},
    {name: 'Редактировать', iconName: 'edit', onClick: () => setEditing(true)},
    {name: 'Удалить', iconName: 'delete', onClick: deleteTask},
  ]

  return (
    <>
      <Dropdown
        button={<Icon name={"menu"} className={styles.icon}/>}
        buttonStyles={styles['main-btn']}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      >
        <ul className={styles.menu}>
          {
            menuButtons.map((btn) => (
              <button
                className={styles.btn}
                onClick={btn.onClick}
                disabled={btn.name === 'Уменьшить' && task.countPomodoro === 1}>
                <Icon name={btn.iconName}/>
                <span>{btn.name}</span>
              </button>
            ))
          }
        </ul>
      </Dropdown>
    </>
  );
}
