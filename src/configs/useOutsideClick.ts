import { RefObject, useEffect } from 'react';

export const useOutsideClick = (ref: RefObject<HTMLElement | null>, onClose: () => void) => {
  useEffect(() => {
    const handleClickOutside: EventListener = (event) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClose]);
};
