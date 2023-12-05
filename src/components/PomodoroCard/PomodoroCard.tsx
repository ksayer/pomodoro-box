import React from 'react';
import { useSelector } from 'react-redux';
import styles from './PomodoroCard.module.css';
import { Icon } from '../Icon';
import { selectSelectedStatistic } from '../../store/slices/statistic';

function getPomodoroString(count: number) {
  let ending;

  if (count % 10 === 1 && count % 100 !== 11) {
    ending = '';
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    ending = 'а';
  } else {
    ending = 'ов';
  }

  return `помидор${ending}`;
}

export function PomodoroCard() {
  const { finishedTasks } = useSelector(selectSelectedStatistic);
  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <Icon name={'tomato'} />
        <span className={styles.card__count}>{`x\u00A0${finishedTasks}`}</span>
      </div>
      <p className={styles.card__footer}>
        {finishedTasks} {getPomodoroString(finishedTasks)}
      </p>
    </div>
  );
}
