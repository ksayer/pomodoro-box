import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './Notification.module.css';
import { Modal } from 'components/Modal';
import ring from 'assets/ring.mp3';

interface INotification {
  showNotification: boolean;
  setShowNotification: Dispatch<SetStateAction<boolean>>;
  text: string;
}

export function Notification({ showNotification, setShowNotification, text }: INotification) {
  const [audio, setAudio] = useState(new Audio(ring));
  if (showNotification) {
    audio.loop = true;
    audio.play();
  }

  const close = () => {
    audio.pause();
    setShowNotification(false);
  };

  return (
    <>
      <Modal close={close} isModalOpened={showNotification}>
        <div className={styles.modal}>
          <h3 className={styles.title}>{text}</h3>
          <button
            className={'btn btn--green'}
            onClick={() => {
              audio.pause();
              setAudio(new Audio(ring));
              setShowNotification(false);
            }}
          >
            Ок
          </button>
        </div>
      </Modal>
    </>
  );
}
