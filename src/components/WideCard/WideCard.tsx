import React from 'react';
import styles from './WideCard.module.css';
import {Icon} from "../Icon";
import {IconName} from "../../svg-icons";
import {getStatistic, Statistic} from "../../store/slices/statistic";
import {useSelector} from "react-redux";
import {convertSeconds} from "../../utils/convertSeconds";

type Card = {
  title: string,
  activeClass: string,
  icon: IconName,
  res: (globalCounter: Statistic) => string | number;
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
    activeClass: `${styles['card--peach']}`,
    res: getFocusResult,
  },
  pauseTime: {
    title: 'Время на паузе',
    icon: 'pause',
    activeClass: `${styles['card--purple']}`,
    res: getPauseResult,
  },
  stops: {
    title: 'Остановки',
    icon: 'stop',
    activeClass: `${styles['card--cyan']}`,
    res: getStopsResult
  }
}

function getFocusResult(statistic: Statistic) {
  const {pauseTime, workingTime, timeOnFinishedTasks} = statistic
  if (!timeOnFinishedTasks) return '0%';
  const result = `${Math.round(timeOnFinishedTasks / (workingTime + pauseTime) * 100)}`
  return `${result}\u00A0%`;
}

function getStopsResult(statistic: Statistic) {
  return statistic.stops
}

function getPauseResult(statistic: Statistic) {
  const pauseSeconds = Math.floor(statistic.pauseTime / 1000)
  if (pauseSeconds && pauseSeconds < 60) return '< 1м'

  const {hours, minutes} = convertSeconds(statistic.pauseTime / 1000)
  let result = '';
  if (hours) result = `${hours}ч`
  if (minutes) result = `${result} ${minutes}м`
  if (!result) return '0м'
  return result
}

export function WideCard({cardName}: {cardName: keyof CardsData}) {
  const card = cardsData[cardName]
  const statistic = useSelector(getStatistic)
  return (
    <div className={`${styles.card} ${statistic.workingTime ? card.activeClass : ""}`}>
      <div className={styles.card__content}>
        <h3 className={styles.card__title}>
          {card.title}
        </h3>
        <p className={styles.card__text}>
          {card.res(statistic)}
        </p>
      </div>
      <Icon name={card.icon} className={styles.card__svg}/>
    </div>
  );
}
