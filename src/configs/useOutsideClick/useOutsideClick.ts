import { RefObject, useEffect } from "react";

function useOutsideClick(ref: RefObject<HTMLElement | null>, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) {
    useEffect(() => {
      const handleClickOutside: EventListener = (event) => {
        
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
         setIsOpen(false)
        }
      }
      
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, setIsOpen]);
}

export default useOutsideClick