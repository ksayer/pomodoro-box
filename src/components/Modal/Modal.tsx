import React, { FC, useRef } from 'react';
import styles from './Modal.module.css';
import './transition.css';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

interface IModal {
  children: React.ReactNode;
  close: () => void;
  isModalOpened: boolean;
}

export const Modal: FC<IModal> = ({ children, close, isModalOpened }) => {
  const ref = useRef(null);

  const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    ref.current && e.target === ref.current && close();
  };

  const modalContainer = document.querySelector('#modal-container');
  if (!modalContainer) return null;
  return ReactDOM.createPortal(
    <CSSTransition in={isModalOpened} timeout={500} classNames="modal" unmountOnExit nodeRef={ref}>
      <div data-no-dnd={true} onClick={onWrapperClick} ref={ref} className={`${styles.modal}`}>
        {children}
      </div>
    </CSSTransition>,
    modalContainer,
  );
};
