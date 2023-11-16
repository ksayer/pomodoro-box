import React from 'react';
import styles from './WideCard.module.css';
import {Icon} from "../Icon";
import {IconName} from "../../svg-icons";
import {getTimerStore, TimerStore} from "../../store/slices/counter";
import {useSelector} from "react-redux";
import {convertSeconds} from "../../utils/convertSeconds";

type Card = {
  title: string,
  icon: IconName,
  res: (globalCounter: TimerStore) => string | number;
}

type CardsData = {
  focus: Card,
  pauseTime: Card,
  stops: Card,
}

const cardsData: CardsData = {
  focus: {
    title: 'Фокус',
    icon: 'focus',
    res: getFocusResult,
  },
  pauseTime: {
    title: 'Время на паузе',
    icon: 'pause',
    res: getPauseResult,
  },
  stops: {
    title: 'Остановки',
    icon: 'stop',
    res: getStopsResult
  }
}

function getFocusResult(globalCounter: TimerStore) {
  const {pauseTime, workingTime, timeOnFinishedTasks} = globalCounter
  if (!timeOnFinishedTasks) return '0%';
  const result = `${Math.round(timeOnFinishedTasks / (workingTime + pauseTime) * 100)}`
  return `${result}\u00A0%`;
}

function getStopsResult(globalCounter: TimerStore) {
  return globalCounter.stops
}

function getPauseResult(globalCounter: TimerStore) {
  const pauseSeconds = Math.floor(globalCounter.pauseTime / 1000)
  if (pauseSeconds && pauseSeconds < 60) return '< 1м'

  const {hours, minutes} = convertSeconds(globalCounter.pauseTime / 1000)
  let result = '';
  if (hours) result = `${hours}ч`
  if (minutes) result = `${result} ${minutes}м`
  if (!result) return '0м'
  return result
}

export function WideCard({cardName}: {cardName: keyof CardsData}) {
  const card = cardsData[cardName]
  const globalCounter = useSelector(getTimerStore)
  return (
    <div className={`${styles.card}`}>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>
          {card.title}
        </h3>
        <p className={styles.card__text}>
          {card.res(globalCounter)}
        </p>
      </div>
      <Icon name={card.icon} className={styles.card__svg}/>
    </div>
  );
}
