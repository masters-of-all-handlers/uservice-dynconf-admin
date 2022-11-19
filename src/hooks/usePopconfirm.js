import {useState, useCallback} from "react";

export function usePopconfirm(initialValue) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {isOpen, open, close};
}
