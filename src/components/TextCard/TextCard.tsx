import React from 'react';
import styles from './TextCard.module.css';
import {useSelector} from "react-redux";
import {getGlobalCounter} from "../../store/slices/counter";
import {convertSeconds} from "../../utils/convertSeconds";

function formatTime(minutes: number, hours: number) {
  let result = "";
  if (hours > 0) {
    result += `${hours} час${getHourSuffix(hours)}`;
  }

  if (minutes > 0) {
    result += `${minutes} минут${geMinuteSuffix(minutes)}`;
  }

  return result;
}

function getHourSuffix(hours: number) {
  if (hours == 1 || (hours % 10 === 1 && hours % 100 !== 11)) return 'а';
  return 'ов'
}

function geMinuteSuffix(minutes: number) {
  if (minutes == 1 || minutes % 10 === 1 && minutes !== 11) return 'ы';
  return ''
}

export function TextCard() {
  const {workingTime} = useSelector(getGlobalCounter)
  const {minutes, hours} = convertSeconds(workingTime / 1000)
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>Понедельник</h3>
      <p className={styles.card__text}>
        {minutes || hours
          ? "Вы работали над задачами в течение "
          : "Нет данных"
        }
        {minutes > 0 && (
          <b className={styles['card__text--red']}> {(minutes || hours) && formatTime(minutes, hours)}</b>
        )}
      </p>
    </div>
  );
}
