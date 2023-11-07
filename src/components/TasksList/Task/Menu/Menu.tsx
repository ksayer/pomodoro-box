import React from 'react';
import styles from './Menu.module.css';
import {Icon} from "../../../Icon";

export function Menu() {
  return (
    <ul className={styles.menu}>
      <li>
        <button className={styles.btn}>
          <Icon name={"plus"}/>
          <span>Увеличить</span>
        </button>
      </li>
      <li>
        <button className={styles.btn}>
          <Icon name={"minus"}/>
          <span>Уменьшить</span>
        </button>
      </li>
      <li>
        <button className={styles.btn}>
          <Icon name={"edit"}/>
          <span>Редактировать</span>
        </button>
      </li>
      <li>
        <button className={styles.btn}>
          <Icon name={"delete"}/>
          <span>Удалить</span>
        </button>
      </li>
    </ul>
  );
}
