import React from 'react';
import styles from './Bar.module.css';
import {useDispatch} from "react-redux";
import {setSelectedDay} from "../../../../store/slices/statistic";

type TWeekDays = Record<number, string>;

const WeekDays: TWeekDays = {
  0: 'Пн',
  1: 'Вт',
  2: 'Ср',
  3: 'Чт',
  4: 'Пт',
  5: 'Сб',
  6: 'Вс',
}

interface IBar {
  date: string;
  selected: boolean;
}

export function Bar({date, selected}: IBar) {
  const dispatch = useDispatch();
  const weekDay = WeekDays[new Date(date).getDay()]
  return (
    <div
      className={`${styles.bar} ${selected && styles['bar--selected']}`}
      onClick={() => dispatch(setSelectedDay(date))}
    >
      <div className={`${styles.day} ${selected && styles['day--selected']}`}>{weekDay}</div>
    </div>
  );
}
