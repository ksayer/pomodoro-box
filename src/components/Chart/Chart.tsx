import React from 'react';
import styles from './Chart.module.css';
import { Bars, getDays } from './Bars';
import { useSelector } from 'react-redux';
import { selectStatistic, TDays } from 'store/slices/statistic';
import { convertSeconds } from 'utils/convertSeconds';

const calculateChartLimit = (selectedDay: string, days: TDays) => {
  const thisWeekDays = getDays(selectedDay);
  const thisWeekData = thisWeekDays.map(date => days[date['date']]);

  const maxSeconds = thisWeekData.reduce((max, day) => {
    const workingDays = day && day.workingTime;
    return workingDays > max ? workingDays : max;
  }, 0);
  return Math.ceil(maxSeconds / 1000 / 60 / 125) * 125 * 60;
};

const getTime = (second: number) => {
  const { hours, minutes } = convertSeconds(second);
  if (!hours) return `${minutes} мин`;
  return `${hours} ч ${minutes} мин`;
};

export function Chart() {
  const { selectedDay } = useSelector(selectStatistic);
  const { days } = useSelector(selectStatistic);
  const chartMaxSeconds = Math.max(calculateChartLimit(selectedDay, days), 125 * 60);

  return (
    <div className={styles.chart}>
      <div className={styles.chart__top}>
        <div className={styles.line}>
          <span className={styles.time}>{getTime((chartMaxSeconds / 5) * 4)}</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>{getTime((chartMaxSeconds / 5) * 3)}</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>{getTime((chartMaxSeconds / 5) * 2)}</span>
        </div>
        <div className={styles.line}>
          <span className={styles.time}>{getTime(chartMaxSeconds / 5)}</span>
        </div>
        <Bars chartMaxSeconds={chartMaxSeconds} />
      </div>
      <div className={styles.chart__footer}></div>
    </div>
  );
}
