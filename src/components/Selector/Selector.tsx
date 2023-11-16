import React, {useRef, useState} from 'react';
import styles from './Selector.module.css';
import {Dropdown} from "../Dropdown";
import {getRandomString} from "../../utils/randomString";

type TypeMenuButton = {
  name: string,
  onClick: () => void,
}

const menuButtons: TypeMenuButton[] = [
  {name: 'Эта неделя', onClick: () => {} },
  {name: 'Прошедшая неделя', onClick: () => {} },
  {name: '2 недели назад', onClick: () => {} },
]

export function Selector() {
  const [selectorOpened, setSelectorOpened] = useState(false);
  const [selected, setSelected] = useState(menuButtons[0]);
  const ref = useRef<HTMLDivElement>(null);

  const selectorButtons = menuButtons.filter(b => b.name != selected.name)

  const handleClickSelector = (btn: TypeMenuButton) => {
    setSelected(btn);
    btn.onClick();
  }

  return (
    <div className={styles.selector} ref={ref}>
      <Dropdown
        button={selected.name}
        buttonStyles={`${styles.btn} ${styles.main_btn} ${selectorOpened ? styles['main_btn--active'] : ""}`}
        isDropdownOpen={selectorOpened}
        setIsDropdownOpen={setSelectorOpened}
      >
        <ul className={styles.list}
            style={{
              transform: `translateY(${ref.current?.offsetHeight}px)`,
              width: `${ref.current?.offsetWidth}px`
            }}
        >
          {
            selectorButtons.map((btn) => (
              <button key={getRandomString()}
                      className={styles.btn}
                      onClick={() => handleClickSelector(btn)}
              >
                <span>{btn.name}</span>
              </button>
            ))
          }
        </ul>
      </Dropdown>
    </div>
  );
}
