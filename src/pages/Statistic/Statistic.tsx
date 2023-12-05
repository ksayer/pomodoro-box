import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Statistic.module.css';
import { Selector } from 'components/Selector';
import { TextCard } from 'components/TextCard';
import { PomodoroCard } from 'components/PomodoroCard';
import { Chart } from 'components/Chart';
import { WideCard } from 'components/WideCard';
import { setSelectedDay } from 'store/slices/statistic';
import { currentDate } from 'utils/datetime';

export function Statistic() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedDay(currentDate()));
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ваша активность</h1>
        <Selector />
      </div>
      <div className={styles.grid}>
        <div className={`${styles.grid__item} ${styles['first-grid-item']}`}>
          <TextCard />
        </div>
        <div className={`${styles.grid__item} ${styles['second-grid-item']}`}>
          <PomodoroCard />
        </div>
        <div className={`${styles.grid__item} ${styles['third-grid-item']}`}>
          <Chart />
        </div>
        <div className={`${styles.grid__item} ${styles['last-card']}`}>
          <WideCard cardName={'focus'} />
        </div>
        <div className={`${styles.grid__item} ${styles['last-card']}`}>
          <WideCard cardName={'pauseTime'} />
        </div>
        <div className={`${styles.grid__item} ${styles['last-card']}`}>
          <WideCard cardName={'stops'} />
        </div>
      </div>
    </div>
  );
}
