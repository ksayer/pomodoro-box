import React from 'react';
import styles from './Iinstruction.module.css';

export function Instruction() {
  return (
    <article className={styles.instruction}>
      <h3 className={styles.title}>Ура! Теперь можно начать работать:</h3>
      <ul className={styles.list}>
        <li className={styles.item}>Выберите категорию и напишите название текущей задачи</li>
        <li className={styles.item}>Запустите таймер ("помидор")</li>
        <li className={styles.item}>Работайте пока "помидор" не прозвонит</li>
        <li className={styles.item}>Сделайте короткий перерыв (3-5 минут)</li>
        <li className={styles.item}>
          Продолжайте работать "помидор" за "помидором", пока задача не будет выполнена. Каждые 4
          "помидора" делайте длинный перерыв (15-30 минут)
        </li>
      </ul>
    </article>
  );
}
