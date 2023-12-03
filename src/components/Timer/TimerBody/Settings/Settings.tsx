import React, {FormEvent, useRef, useState} from 'react';
import styles from './Settings.module.css';
import {Icon} from "../../../Icon";
import {Modal} from "../../../Modal";
import {useDispatch, useSelector} from "react-redux";
import {getSettings, updatePomodoroDurationMinutes, updateSettings, updateShortBreakDurationMinutes} from "../../../../store/slices/settings";
import {
  BREAK_DURATION_MINUTES,
  LONG_BREAK_DURATION_MINUTES,
  POMODORO_DURATION_MINUTES,
  POMODORO_BETWEEN_LONG_BREAK
} from "../../../../constants";

export function Settings() {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const {
    pomodoroDurationMinutes,
    shortBreakDurationMinutes,
    longBreakDurationMinutes,
    pomodoroBetweenLongBreak
  } = useSelector(getSettings);
  const dispatch = useDispatch()
  const pomodoroDurationRef = useRef<HTMLInputElement>(null);
  const shortBreakDurationRef = useRef<HTMLInputElement>(null);
  const longBreakDurationRef = useRef<HTMLInputElement>(null);
  const pomodoroBetweenLongBreakRef = useRef<HTMLInputElement>(null);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(updateSettings({
      // pomodoroDurationMinutes: parseInt(pomodoroDurationRef.current?.value || '1'),
      // shortBreakDurationMinutes: parseInt(shortBreakDurationRef.current?.value || '1'),
      longBreakDurationMinutes: parseInt(longBreakDurationRef.current?.value || '1'),
      pomodoroBetweenLongBreak: parseInt(pomodoroBetweenLongBreakRef.current?.value || '1'),
    }));
    dispatch(updatePomodoroDurationMinutes(parseInt(pomodoroDurationRef.current?.value || '1')))
    dispatch(updateShortBreakDurationMinutes(parseInt(shortBreakDurationRef.current?.value || '1')))
    setIsModalOpened(false);
  }
  const inputs = [
    {defaultValue: pomodoroDurationMinutes || POMODORO_DURATION_MINUTES, ref: pomodoroDurationRef, text: 'Продолжительность помидора:'},
    {defaultValue: shortBreakDurationMinutes || BREAK_DURATION_MINUTES, ref: shortBreakDurationRef, text: 'Продолжительность короткого перерыва:'},
    {defaultValue: longBreakDurationMinutes || LONG_BREAK_DURATION_MINUTES, ref: longBreakDurationRef, text: 'Продолжительность длинного перерыва:'},
    {defaultValue: pomodoroBetweenLongBreak || POMODORO_BETWEEN_LONG_BREAK, ref: pomodoroBetweenLongBreakRef, text: 'Количество помидоров между длинными перерывами:'},
  ]

  return (
    <>
      <button
        className={styles.btn}
        onClick={() => setIsModalOpened(true)}
      >
        <Icon name={"settings"}/>
      </button>
      <Modal close={() => setIsModalOpened(false)} isModalOpened={isModalOpened}>
        <div className={styles.modal}>
          <h3 className={styles.title}>Настройки таймера</h3>
          <form className={styles.form} onSubmit={onSubmit}>
            {inputs.map((input) => {
              return (
                <label key={input.text} className={styles.label}>{input.text}
                  <input className={styles.input} {...input} type="number" min={1} max={99}/>
                </label>
              )
            })}
            <label className={`${styles.label} ${styles['checkbox-label']}`}>Уведомления:
              <input className={styles.checkbox} type="checkbox" name="duration" min={1}/>
            </label>
            <div className={styles['group--btn']}>
              <button
                type={"submit"}
                className={`btn btn--green`}
              >Ок
              </button>
              <button
                type={"button"}
                className={`btn btn--red`}
                onClick={() => setIsModalOpened(false)}
              >Отмена
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
