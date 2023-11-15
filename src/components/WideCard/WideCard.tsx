import React from 'react';
import styles from './WideCard.module.css';
import {Icon} from "../Icon";
import {IconName} from "../../svg-icons";
import {getGlobalCounter, GlobalCounter} from "../../store/slices/counter";
import {useSelector} from "react-redux";

type Card = {
  title: string,
  icon: IconName,
  res: (globalCounter: GlobalCounter) => string | number;
}

type CardsData = {
  focus: Card,
  pause: Card,
  stop: Card,
}

const cardsData: CardsData = {
  focus: {
    title: 'Фокус',
    icon: 'focus',
    res: getFocusResult,
  },
  pause: {
    title: 'Время на паузе',
    icon: 'pause',
    res: getFocusResult,
  },
  stop: {
    title: 'Остановки',
    icon: 'stop',
    res: getFocusResult
  }
}

function getFocusResult(globalCounter: GlobalCounter) {
  return globalCounter.finishedTasks
}

export function WideCard({cardName}: {cardName: keyof CardsData}) {
  const card = cardsData[cardName]
  const globalCounter = useSelector(getGlobalCounter)
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
