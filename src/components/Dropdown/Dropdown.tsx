import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from 'react';
import styles from './Dropdown.module.css';
import ReactDOM from 'react-dom';


interface IUseClickOutside {
  ref:React.RefObject<HTMLDivElement>,
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}

const useClickOutside = ({ref, setIsDropdownOpen}: IUseClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)){
        setIsDropdownOpen(false);
      }
    }
    const closeHandler = () => setIsDropdownOpen(false)
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', closeHandler);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', closeHandler);
    }
  }, [ref])
}

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
  useClickOutside({ref, setIsDropdownOpen});

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
