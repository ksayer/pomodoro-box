import React, {useEffect, useRef} from 'react';
import './transition.css';
import styles from "./ClockFace.module.css";
import {Icon} from "../../../Icon";
import {useDispatch, useSelector} from "react-redux";
import {getTimerStore, setSeconds} from "../../../../store/slices/timer";
import {CSSTransition, TransitionGroup} from "react-transition-group";


interface IClockFace {
  secondsOnUpdate: number
  isStopDown: boolean
  handlers: {
    finishTask: () => void
  }
}


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

export const ClockFace = ({secondsOnUpdate, isStopDown, handlers}: IClockFace) => {
  const {isBreak, seconds, status} = useSelector(getTimerStore);
  const dispatcher = useDispatch();
  const {minutesFirst, minutesSecond, secondsFirst, secondsSecond} = getClockString(seconds)

  useInterval(() => {
    const newSeconds = seconds - 1
    dispatcher(setSeconds(newSeconds));
    if (newSeconds <= 0) {
      setTimeout(() => handlers.finishTask(), 100);
    }
  }, status === 'isWork' ? 1000 : null)

  const updateTimer = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    dispatcher(setSeconds(secondsOnUpdate));
  }
  return (
    <div className={styles['counter-container']}>
      <div className={`${styles.counter} ${isBreak && status === 'isWork' ? 
        styles['counter--break'] : status === 'isWork' ? 
          isStopDown ? styles['counter--stop'] : styles['counter--running'] 
          : ""}`}>
        {[minutesFirst, minutesSecond, secondsFirst, secondsSecond].map((number, index) =>
          <React.Fragment key={index}>
            <TransitionGroup className={styles.number}>
              <CSSTransition
                key={index}
                timeout={900}
                classNames="transition"
              >
                <span className={styles.transition}>{number}</span>
              </CSSTransition>
            </TransitionGroup>
            {index === 1 && <span>:</span>}
          </React.Fragment>
        )}
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
