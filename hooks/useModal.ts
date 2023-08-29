// 커스텀 훅 저장하는 폴더
import { useState } from 'react';

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);

  const toggle = () => setIsShowing((prev) => !prev);

  return {
    isShowing,
    toggle,
  };
};

export default useModal;