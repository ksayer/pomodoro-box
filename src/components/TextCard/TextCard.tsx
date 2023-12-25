import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TextCard.module.css';
import { selectSelectedStatistic, selectStatistic } from 'store/slices/statistic';
import { convertSeconds } from 'utils/convertSeconds';
import { getDayIndexWithMondayAsFirstDay, WeekDaysFull } from 'utils/datetime';

function formatTime(minutes: number, hours: number) {
  let result = '';
  if (hours > 0) {
    result += `${hours} час${getHourSuffix(hours)}`;
  }

  if (minutes > 0) {
    result += ` ${minutes} минут${geMinuteSuffix(minutes)}`;
  }

  return result;
}

function getHourSuffix(hours: number) {
  if (hours === 1 || (hours % 10 === 1 && hours % 100 !== 11)) return 'а';
  return 'ов';
}

function geMinuteSuffix(minutes: number) {
  if (minutes === 1 || (minutes % 10 === 1 && minutes !== 11)) return 'ы';
  return '';
}

export function TextCard() {
  const { workingTime } = useSelector(selectSelectedStatistic);
  const { selectedDay } = useSelector(selectStatistic);
  const { minutes, hours, seconds } = convertSeconds(workingTime / 1000);
  const text = 'Вы работали над задачами';
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>
        {WeekDaysFull[getDayIndexWithMondayAsFirstDay(new Date(selectedDay))]}
      </h3>
      <p className={styles.card__text}>
        {minutes || hours ? `${text} в течение ` : seconds ? `${text} менее` : 'Нет данных'}
        {(minutes > 0 || hours > 0 || seconds > 0) && (
          <b className={styles['card__text--red']}>
            {' '}
            {minutes || hours ? formatTime(minutes, hours) : seconds ? '1\u00A0минуты' : ''}
          </b>
        )}
      </p>
    </div>
  );
}
