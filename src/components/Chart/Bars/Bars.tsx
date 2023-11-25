import React from 'react';
import styles from './Bars.module.css';
import {Bar} from "./Bar";
import {getStatistic} from "../../../store/slices/statistic";
import {useSelector} from "react-redux";
import {dateToStoreFormat, getDayIndexWithMondayAsFirstDay} from "../../../utils/datetime";

const getDays = (selectedDay: string) => {
  return [0, 1, 2, 3, 4, 5, 6].map(weekday => {
    const today = new Date(selectedDay);
    const differenceWithToday = weekday - getDayIndexWithMondayAsFirstDay(today);
    const dateWeekday = new Date(today.setDate(today.getDate() + differenceWithToday))
    return {date: dateToStoreFormat(dateWeekday)};
  })
}

export function Bars() {
  const { selectedDay } = useSelector(getStatistic)
  const days = getDays(selectedDay);
  return (
    <div className={styles.bars}>
      {
        days.map(day =>
          <Bar
            key={day.date}
            date={day.date}
            selected={day.date === selectedDay}
          />
        )
      }
    </div>
  );
}
