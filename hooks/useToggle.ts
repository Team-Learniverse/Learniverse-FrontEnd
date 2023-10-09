import { useState } from 'react';

type UseToggleReturnType = [boolean, () => void];

const useToggle = (): UseToggleReturnType => {
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle((prevState) => !prevState);
  };

  return [toggle, handleToggle];
};

export default useToggle;
