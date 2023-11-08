import React, {useState} from 'react';
import styles from './Menu.module.css';
import {Icon} from "../../../Icon";
import {Dropdown} from "../../../Dropdown";

export function Menu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
      </Dropdown>
    </>
  );
}
