import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { Icon } from '../Icon';
import { Theme } from '../Theme';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <Link to={'/'} className={`${styles.link} ${styles['left-link']}`}>
          <Icon name={'logo'} className={styles.logo} />
          <span className={`${styles['left-text']} ${styles['link-text']}`}>pomodoro_box</span>
        </Link>
        <Theme />
        <Link to={'statistic'} className={`${styles.link} ${styles['right-link']}`}>
          <Icon name={'statistic'} className={styles.rightSvg} />
          <span className={`${styles['right-text']} ${styles['link-text']}`}>Статистика</span>
        </Link>
      </div>
    </header>
  );
}
