import React, {useRef, useState} from 'react';
import styles from './Selector.module.css';
import {Dropdown} from "../Dropdown";
import {getRandomString} from "../../utils/randomString";
import {useDispatch, useSelector} from "react-redux";
import {getStatistic, setSelectedDay} from "../../store/slices/statistic";
import {dateToStoreFormat} from "../../utils/datetime";

type TypeMenuButton = {
  name: string,
  weekNumber: number,
}

const menuButtons: TypeMenuButton[] = [
  {name: 'Эта неделя', weekNumber: 0},
  {name: 'Прошедшая неделя', weekNumber: -1},
  {name: '2 недели назад', weekNumber: -2},
]

export function Selector() {
  const [selectorOpened, setSelectorOpened] = useState(false);
  const [selected, setSelected] = useState(menuButtons[0]);
  const dispatch = useDispatch();
  const {selectedDay} = useSelector(getStatistic)
  const ref = useRef<HTMLDivElement>(null);

  const selectorButtons = menuButtons.filter(b => b.name != selected.name)

  const handleClickSelector = (btn: TypeMenuButton) => {
    setSelected(btn);
    const dateOnSelectedWeek = new Date(selectedDay)
    dateOnSelectedWeek.setDate(dateOnSelectedWeek.getDate() + (btn.weekNumber - selected.weekNumber) * 7)
    dispatch(setSelectedDay(dateToStoreFormat(dateOnSelectedWeek)))
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
