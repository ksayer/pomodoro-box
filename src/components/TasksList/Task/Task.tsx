import React, {FC} from 'react';
import styles from './Task.module.css';
import {Icon} from "../../Icon";
import {Menu} from "./Menu";

export const Task: FC<{
  name: string,
  countPomodoro: number,
}> = ({name, countPomodoro}) => {
  return (
    <li className={styles.item}>
      <div className={styles.counter}>{countPomodoro}</div>
      {name}
      <button className={styles.btn}>
        <Icon name={"menu"}/>
      </button>
      <Menu/>
    </li>
  );
}
