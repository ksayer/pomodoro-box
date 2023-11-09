import React, {EventHandler, FC, FormEvent, useEffect, useRef, useState} from 'react';
import styles from './Task.module.css';
import {Icon} from "../../Icon";
import {Menu} from "./Menu";
import {TaskType, updateTaskName} from "../../../store/slices/tasks";
import {useDispatch} from "react-redux";


export const Task: FC<{task: TaskType}> = ({task}) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.name);
  const dispatch = useDispatch();

  const onBlur = () => {
    const newName = !value ? task.name : value;
    dispatch(updateTaskName({id: task.id, name: newName}))
    setEditing(false);
  }
  return (
    <li className={styles.item}>
      <div className={styles.counter}>{task.countPomodoro}</div>
      {!editing ?
        (<div
          onDoubleClick={() => setEditing(true)}
          className={`${styles.name}`}>
            {task.name}
        </div>)
        :
        (<input
            style={{outline: "none", border: "none"}}
            className={`${styles.input}`}
            autoFocus={true}
            onBlur={onBlur}
            type="text"
            value={value}
            onInput={(e) => setValue(e.currentTarget.value)}
          />
        )}
      <Menu task={task} setEditing={setEditing}/>
    </li>
  );
}
