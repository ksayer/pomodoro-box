import React from 'react';
import { useSelector } from 'react-redux';
import styles from './Bars.module.css';
import { Bar } from './Bar';
import { selectStatistic } from 'store/slices/statistic';
import { dateToStoreFormat, getDayIndexWithMondayAsFirstDay } from 'utils/datetime';

export const getDays = (selectedDay: string) =>
  [0, 1, 2, 3, 4, 5, 6].map(weekday => {
    const today = new Date(selectedDay);
    const differenceWithToday = weekday - getDayIndexWithMondayAsFirstDay(today);
    const dateWeekday = new Date(today.setDate(today.getDate() + differenceWithToday));
    return { date: dateToStoreFormat(dateWeekday) };
  });

interface IBars {
  chartMaxSeconds: number;
}

export function Bars({ chartMaxSeconds }: IBars) {
  const { selectedDay } = useSelector(selectStatistic);
  const days = getDays(selectedDay);
  return (
    <div className={styles.bars}>
      {days.map(day => (
        <Bar
          key={day.date}
          date={day.date}
          selected={day.date === selectedDay}
          chartMaxSeconds={chartMaxSeconds}
        />
      ))}
    </div>
  );
}
