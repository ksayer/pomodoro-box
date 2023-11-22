import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import styles from './Dropdown.module.css';
import ReactDOM from 'react-dom';
import {useClickOutside} from '../../hooks/useClickOutside'

interface IDropdown {
  isDropdownOpen: boolean,
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>,
  children: React.ReactNode,
  button: React.ReactNode,
  buttonStyles: any,
}

interface ICoords {
  left: number,
  top: number,
}

export const Dropdown: FC<IDropdown> = ({isDropdownOpen, setIsDropdownOpen, children, button, buttonStyles}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<ICoords>({ left: 0, top: 0 });
  useClickOutside({ref, setIsOpen: setIsDropdownOpen, isOpen: isDropdownOpen});

  const updateCoords: React.MouseEventHandler<HTMLElement> = (e) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setCoords({ left: rect.x, top: rect.y + window.scrollY });
  };
  const modalContainer = document.querySelector('#modal-container');
  if (!modalContainer) return null;
  return (
    <div ref={ref}>
      <button data-no-dnd={true}
        className={buttonStyles}
        onClick={(e) => {
          updateCoords(e);
          setIsDropdownOpen(!isDropdownOpen)
        }}>
        {button}
      </button>
      {isDropdownOpen && ReactDOM.createPortal(
        <div
          data-no-dnd={true}
          style={{ left: coords.left, top: coords.top, position: "absolute"}}
          className={styles.dropdown}
        >
          {children}
        </div>, modalContainer
      )}
    </div>
  );
}
