import React from 'react';
import styles from './Bar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getStatistic, initialDayStatistic, setSelectedDay} from "../../../../store/slices/statistic";

type TWeekDays = Record<number, string>;

const WeekDays: TWeekDays = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Cб',
  0: 'Вс',
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
  const { days } = useSelector(getStatistic)

  const weekDay = WeekDays[new Date(date).getDay()]
  const barStatistic = days[date] || {...initialDayStatistic}
  const barHeight = `${getBarPercent(barStatistic.workingTime) || 1.3}%`

  return (
    <div
      className={`${styles.bar} ${selected && styles['bar--selected']} ${barStatistic.workingTime && styles['bar--filled']}`}
      onClick={() => dispatch(setSelectedDay(date))}
      style={{height: barHeight}}
    >
      <div className={`${styles.day} ${selected && styles['day--selected']}`}>{weekDay}</div>
    </div>
  );
}
