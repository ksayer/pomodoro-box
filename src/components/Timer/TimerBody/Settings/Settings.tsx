import React, { FormEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Settings.module.css';
import { Icon } from 'components/Icon';
import { Modal } from 'components/Modal';
import { selectSettings, updateSettings } from 'store/slices/settings';
import {
  BREAK_DURATION_MINUTES,
  LONG_BREAK_DURATION_MINUTES,
  POMODORO_DURATION_MINUTES,
  POMODORO_BETWEEN_LONG_BREAK,
} from 'constants/index';
import { selectTimerStore, setSeconds } from 'store/slices/timer';
import { selectTodayStatistic } from 'store/slices/statistic';

export function Settings() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const {
    pomodoroDurationMinutes,
    shortBreakDurationMinutes,
    longBreakDurationMinutes,
    pomodoroBetweenLongBreak,
    enableNotification,
  } = useSelector(selectSettings);
  const { isBreak, status } = useSelector(selectTimerStore);
  const { finishedTasks } = useSelector(selectTodayStatistic);
  const dispatch = useDispatch();
  const pomodoroDurationRef = useRef<HTMLInputElement>(null);
  const shortBreakDurationRef = useRef<HTMLInputElement>(null);
  const longBreakDurationRef = useRef<HTMLInputElement>(null);
  const pomodoroBetweenLongBreakRef = useRef<HTMLInputElement>(null);
  const enableNotificationRef = useRef<HTMLInputElement>(null);

  const updateTimerByLongBreak = (newMinutes: number, newPomodoroBetweenLongBreak: number) => {
    if (
      newMinutes &&
      status === 'isStop' &&
      isBreak &&
      finishedTasks % newPomodoroBetweenLongBreak === 0
    ) {
      dispatch(setSeconds(newMinutes * 60));
    }
  };

  const updateTimerByShortBreak = (newMinutes: number, newPomodoroBetweenLongBreak: number) => {
    if (
      newMinutes &&
      status === 'isStop' &&
      isBreak &&
      finishedTasks % newPomodoroBetweenLongBreak !== 0
    ) {
      dispatch(setSeconds(newMinutes * 60));
    }
  };

  const updateTimerByPomodoro = (newMinutes: number) => {
    if (newMinutes && status === 'isStop' && !isBreak) {
      dispatch(setSeconds(newMinutes * 60));
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newPomodoroBetweenLongBreak = parseInt(pomodoroBetweenLongBreakRef.current?.value || '1');

    const newPomodoroDurationMinutes = parseInt(pomodoroDurationRef.current?.value || '1');
    updateTimerByPomodoro(newPomodoroDurationMinutes);

    const newShortBreakDurationMinutes = parseInt(shortBreakDurationRef.current?.value || '1');
    updateTimerByShortBreak(newShortBreakDurationMinutes, newPomodoroBetweenLongBreak);

    const newLongBreakDurationMinutes = parseInt(longBreakDurationRef.current?.value || '1');
    updateTimerByLongBreak(newLongBreakDurationMinutes, newPomodoroBetweenLongBreak);

    dispatch(
      updateSettings({
        pomodoroDurationMinutes: newPomodoroDurationMinutes,
        shortBreakDurationMinutes: newShortBreakDurationMinutes,
        longBreakDurationMinutes: newLongBreakDurationMinutes,
        pomodoroBetweenLongBreak: newPomodoroBetweenLongBreak,
        enableNotification: enableNotificationRef.current?.checked,
      }),
    );

    setIsModalOpened(false);
  };

  const inputs = [
    {
      defaultValue: pomodoroDurationMinutes || POMODORO_DURATION_MINUTES,
      ref: pomodoroDurationRef,
      text: 'Продолжительность помидора:',
    },
    {
      defaultValue: shortBreakDurationMinutes || BREAK_DURATION_MINUTES,
      ref: shortBreakDurationRef,
      text: 'Продолжительность короткого перерыва:',
    },
    {
      defaultValue: longBreakDurationMinutes || LONG_BREAK_DURATION_MINUTES,
      ref: longBreakDurationRef,
      text: 'Продолжительность длинного перерыва:',
    },
    {
      defaultValue: pomodoroBetweenLongBreak || POMODORO_BETWEEN_LONG_BREAK,
      ref: pomodoroBetweenLongBreakRef,
      text: 'Количество помидоров между длинными перерывами:',
    },
  ];

  return (
    <>
      <button className={styles.btn} onClick={() => setIsModalOpened(true)}>
        <Icon name={'settings'} />
      </button>
      <Modal close={() => setIsModalOpened(false)} isModalOpened={isModalOpened}>
        <div className={styles.modal}>
          <h3 className={styles.title}>Настройки таймера</h3>
          <form className={styles.form} onSubmit={onSubmit}>
            {inputs.map(input => (
              <label key={input.text} className={styles.label}>
                {input.text}
                <input className={styles.input} {...input} type="number" min={1} max={99} />
              </label>
            ))}
            <label className={`${styles.label} ${styles['checkbox-label']}`}>
              Уведомления:
              <input
                ref={enableNotificationRef}
                defaultChecked={enableNotification}
                className={styles.checkbox}
                type="checkbox"
                name="duration"
                min={1}
              />
            </label>
            <div className={styles['group--btn']}>
              <button type={'submit'} className={'btn btn--green'}>
                Ок
              </button>
              <button
                type={'button'}
                className={'btn btn--red'}
                onClick={() => setIsModalOpened(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
