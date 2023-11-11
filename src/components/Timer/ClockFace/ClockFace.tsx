import React, {useEffect} from 'react';
import styles from "./ClockFace.module.css";
import {getTimer} from "../../../store/slices/timer";
import {useSelector} from "react-redux";


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

interface IClockFace {
  stopHandler: () => void,
}

export const ClockFace = ({stopHandler}: IClockFace) => {
  const timer = useSelector(getTimer);
  const {minutesFirst, minutesSecond, secondsFirst, secondsSecond} = getClockString(timer.seconds)

  useEffect(() => {
    if (timer.seconds <= 0) {
      stopHandler()
    }
  }, [timer.seconds])

  return (
    <div className={styles.counter}>
      <span className={styles.number}>{minutesFirst}</span>
      <span className={styles.number}>{minutesSecond}</span>
      <span>:</span>
      <span className={styles.number}>{secondsFirst}</span>
      <span className={styles.number}>{secondsSecond}</span>
    </div>
  )
}
