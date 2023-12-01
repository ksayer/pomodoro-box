import React, {FC, useRef} from 'react';
import styles from './Modal.module.css';
import ReactDOM from "react-dom";

interface IModal {
  children: React.ReactNode,
  close: () => void
}

export const Modal: FC<IModal> = ({children, close}) => {
  const ref = useRef(null);

  const onWrapperClick = (e: React.MouseEvent<HTMLDivElement>) => {
    ref.current &&
    e.target === ref.current &&
    close()
  }

  const modalContainer = document.querySelector('#modal-container');
  if (!modalContainer) return null;
  return (
    ReactDOM.createPortal(
      <div
        data-no-dnd={true}
        onClick={onWrapperClick}
        ref={ref} className={`${styles.modal}`}>{children}
      </div>
      , modalContainer
    )
  );
}
