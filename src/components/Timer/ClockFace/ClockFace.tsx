import React, {useEffect, useRef} from 'react';
import styles from "./ClockFace.module.css";
import {Icon} from "../../Icon";


function timeToString(time: number) {
  if (time < 10) return {firstNumber: 0, secondNumber: time}
  return {firstNumber: String(time)[0], secondNumber: String(time)[1]}
}

function getClockString(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60
  const {firstNumber: minutesFirst, secondNumber: minutesSecond} = timeToString(minutes);
  const {firstNumber: secondsFirst, secondNumber: secondsSecond} = timeToString(seconds);
  return {minutesFirst, minutesSecond, secondsFirst, secondsSecond}
}

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

interface IClockFace {
  seconds: number
  isRunning: boolean
  secondsOnUpdate: number
  handlers: {
    finishTask: () => void
    setSeconds: (v: number) => void
  }
}

export const ClockFace = ({seconds, isRunning, secondsOnUpdate, handlers}: IClockFace) => {
  const {minutesFirst, minutesSecond, secondsFirst, secondsSecond} = getClockString(seconds)

  useInterval(() => {
    const newSeconds = seconds - 1
    handlers.setSeconds(newSeconds);
    if (newSeconds <= 0) {
      setTimeout(() => handlers.finishTask(), 500);
    }
  }, isRunning ? 1000 : null)

  const updateTimer = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    handlers.setSeconds(secondsOnUpdate);
  }

  return (
    <div className={styles['counter-container']}>
      <div className={styles.counter}>
        <span className={styles.number}>{minutesFirst}</span>
        <span className={styles.number}>{minutesSecond}</span>
        <span>:</span>
        <span className={styles.number}>{secondsFirst}</span>
        <span className={styles.number}>{secondsSecond}</span>
      </div>
      <button
        className={styles['uptime-btn']}
        onClick={updateTimer}
      >
        <Icon name={"filledPlus"} className={styles['plus-color']}/>
      </button>
    </div>
  )
}