import React, { Dispatch, SetStateAction, useEffect } from 'react';

interface IUseClickOutside {
  ref: React.RefObject<HTMLDivElement>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen?: boolean;
}

export const useClickOutside = ({ ref, setIsOpen, isOpen }: IUseClickOutside) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    const closeHandler = () => setIsOpen(false);
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      timeoutId = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    }
    window.addEventListener('resize', closeHandler);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', closeHandler);
    };
  }, [ref, setIsOpen, isOpen]);
};
