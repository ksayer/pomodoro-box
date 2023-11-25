import React from 'react';
import styles from './Bars.module.css';
import {Bar} from "./Bar";
import {getStatistic} from "../../../store/slices/statistic";
import {useSelector} from "react-redux";
import {dateToStoreFormat} from "../../../utils/datetime";

const getDays = () => {
  return [0, 1, 2, 3, 4, 5, 6].map(weekday => {
    const today = new Date();
    const differenceWithToday = weekday - today.getDay();
    const dateWeekday = new Date(today.setDate(today.getDate() + differenceWithToday))
    return {date: dateToStoreFormat(dateWeekday)};
  })
}

export function Bars() {
  const { selectedDay } = useSelector(getStatistic)
  const days = getDays();
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
