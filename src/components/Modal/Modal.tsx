import React, {Dispatch, FC, SetStateAction, useRef} from 'react';
import styles from './Modal.module.css';
import ReactDOM from "react-dom";
import {useClickOutside} from "../../hooks/useClickOutside";

interface IModal {
  children: React.ReactNode,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  isModalOpen: boolean
}

export const Modal: FC<IModal> = ({children, isModalOpen, setIsModalOpen}) => {
  const ref = useRef(null);
  useClickOutside({ref, setIsOpen: setIsModalOpen, isOpen: isModalOpen});


  const modalContainer = document.querySelector('#modal-container');
  if (!modalContainer) return null;
  return (
    ReactDOM.createPortal(
      <div
        style={{
          animation: `${styles.fadeIn} 0.3s`,
        }}
        ref={ref} className={`${styles.modal}`}>{children}
      </div>
    , modalContainer
    )
  );
}
