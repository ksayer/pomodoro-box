import React, { createRef, useEffect, useRef } from 'react';
import './transition.css';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './ClockFace.module.css';
import { Icon } from 'components/Icon';
import { selectTimerStore, setSeconds } from 'store/slices/timer';
import { incrementPauseTime, incrementWorkingTime } from 'store/slices/statistic';
import { incrementWorkingSecondsLastTask, selectTasks } from 'store/slices/tasks';

interface IClockFace {
  secondsOnUpdate: number;
  isStopDown: boolean;
  handlers: {
    finishTask: () => void;
  };
}

function timeToString(time: number) {
  if (time < 10) return { firstNumber: 0, secondNumber: time };
  return { firstNumber: String(time)[0], secondNumber: String(time)[1] };
}

function getClockString(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const { firstNumber: minutesFirst, secondNumber: minutesSecond } = timeToString(minutes);
  const { firstNumber: secondsFirst, secondNumber: secondsSecond } = timeToString(seconds);
  return { minutesFirst, minutesSecond, secondsFirst, secondsSecond };
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
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const ClockFace = ({ secondsOnUpdate, isStopDown, handlers }: IClockFace) => {
  const { isBreak, seconds, status } = useSelector(selectTimerStore);
  const tasks = useSelector(selectTasks);
  const dispatcher = useDispatch();
  const { minutesFirst, minutesSecond, secondsFirst, secondsSecond } = getClockString(seconds);

  useInterval(
    () => {
      if (status === 'isWork') {
        dispatcher(setSeconds(seconds - 1));
        if (!isBreak) {
          dispatcher(incrementWorkingTime());
          if (tasks.length) dispatcher(incrementWorkingSecondsLastTask());
        }
      }
      if (status === 'isPause') dispatcher(incrementPauseTime());

      if (seconds <= 1) {
        setTimeout(() => handlers.finishTask(), 100);
      }
    },
    status === 'isStop' ? null : 1000,
  );

  const updateTimer = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.blur();
    dispatcher(setSeconds(secondsOnUpdate));
  };

  const numbers = [
    { time: minutesFirst, ref: createRef<HTMLElement>() },
    { time: minutesSecond, ref: createRef<HTMLElement>() },
    { time: secondsFirst, ref: createRef<HTMLElement>() },
    { time: secondsSecond, ref: createRef<HTMLElement>() },
  ];

  return (
    <div className={styles['counter-container']}>
      <div
        className={`${styles.counter} ${
          isBreak && status === 'isWork'
            ? styles['counter--break']
            : status === 'isWork'
              ? isStopDown
                ? styles['counter--stop']
                : styles['counter--running']
              : ''
        }`}
      >
        {numbers.map(({ time, ref }, index) => (
          <React.Fragment key={index}>
            <TransitionGroup className={styles.number}>
              <CSSTransition nodeRef={ref} key={time} timeout={900} classNames="transition">
                <span ref={ref} className={styles.transition}>
                  {time}
                </span>
              </CSSTransition>
            </TransitionGroup>
            {index === 1 && <span>:</span>}
          </React.Fragment>
        ))}
      </div>
      <button className={styles['uptime-btn']} onClick={updateTimer}>
        <Icon name={'filledPlus'} className={styles['plus-color']} />
      </button>
    </div>
  );
};
