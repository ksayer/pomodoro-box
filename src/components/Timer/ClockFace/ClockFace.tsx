import React, {useEffect, useRef, useState} from 'react';
import styles from "./ClockFace.module.css";
import {useDispatch} from "react-redux";
import {Icon} from "../../Icon";
import {POMODORO_START_SECONDS} from "../../../constants";


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
  isRunning: boolean
  stopHandler: () => void
  finishTask: () => void
}

export const ClockFace = ({isRunning, finishTask, stopHandler}: IClockFace) => {
  const [seconds, setSeconds] = useState(POMODORO_START_SECONDS);
  const dispatcher = useDispatch();
  const {minutesFirst, minutesSecond, secondsFirst, secondsSecond} = getClockString(seconds)

  useInterval(() => {
    const newSeconds = seconds - 1
    if (newSeconds <= 0) clearTimerOnExceedsTime();
    setSeconds(newSeconds);
  }, isRunning ? 1000 : null)

  function clearTimerOnExceedsTime() {
    stopHandler();
    setTimeout(() => setSeconds(5), 500);
    finishTask();
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
        onClick={(e) => {
          e.currentTarget.blur();
          setSeconds(POMODORO_START_SECONDS);
        }}
      >
        <Icon name={"filledPlus"} className={styles['plus-color']}/>
      </button>
    </div>
  )
}
