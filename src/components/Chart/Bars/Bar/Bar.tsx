import React from 'react';
import styles from './Bar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getStatistic, setSelectedDay} from "../../../../store/slices/statistic";

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

const getBarPercent = (workingTime: number) => {
  if (!workingTime) return 0;
  const workingTimeLimit = 125 * 60 * 1000;
  const completedPercent = workingTime * 100  / workingTimeLimit;
  return Math.max(completedPercent, 1.3)
}

export function Bar({date, selected}: IBar) {
  const dispatch = useDispatch();
  const weekDay = WeekDays[new Date(date).getDay()]
  const { days } = useSelector(getStatistic)
  const barHeight = `${getBarPercent(days[date].workingTime) || 1.3}%`
  return (
    <div
      className={`${styles.bar} ${selected && styles['bar--selected']} ${days[date].workingTime && styles['bar--filled']}`}
      onClick={() => dispatch(setSelectedDay(date))}
      style={{height: barHeight}}
    >
      <div className={`${styles.day} ${selected && styles['day--selected']}`}>{weekDay}</div>
    </div>
  );
}
