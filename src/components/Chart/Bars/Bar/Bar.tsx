import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Bar.module.css';
import { selectStatistic, initialDayStatistic, setSelectedDay } from 'store/slices/statistic';
import { WeekDayShort } from 'utils/datetime';

interface IBar {
  date: string;
  selected: boolean;
  chartMaxSeconds: number;
}

const getBarPercent = (workingTime: number, chartMaxSeconds: number) => {
  if (!workingTime) return 0;
  const workingTimeLimit = chartMaxSeconds * 1000;
  const completedPercent = (workingTime * 100) / workingTimeLimit;
  return Math.max(completedPercent, 1.3);
};

export function Bar({ date, selected, chartMaxSeconds }: IBar) {
  const dispatch = useDispatch();
  const { days } = useSelector(selectStatistic);
  const weekDay = WeekDayShort[new Date(date).getDay()];
  const barStatistic = days[date] || { ...initialDayStatistic };
  const barHeight = `${getBarPercent(barStatistic.workingTime, chartMaxSeconds) || 1.3}%`;

  return (
    <div
      className={`${styles.bar} ${selected && styles['bar--selected']} ${
        barStatistic.workingTime && styles['bar--filled']
      }`}
      onClick={() => dispatch(setSelectedDay(date))}
      style={{ maxHeight: barHeight, height: barHeight }}
    >
      <div className={`${styles.day} ${selected && styles['day--selected']}`}>{weekDay}</div>
    </div>
  );
}
