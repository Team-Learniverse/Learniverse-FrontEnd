// 커스텀 훅 저장하는 폴더
import { useState } from "react";

export type UseModalReturnType = {
  isShowing: boolean;
  toggle: () => void;
  setShowing: (showing: boolean) => void;
};

const useModal = (): UseModalReturnType => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing((prev) => !prev);

  const setShowing = (showing: boolean) => setIsShowing(showing);

  return {
    isShowing,
    toggle,
    setShowing,
  };
};

export default useModal;
