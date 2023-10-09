import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import TimeContext from './TimeContext';

interface TimeProviderProps {
  children: React.ReactNode;
  coreEndTime: Date;
}

const TimeProvider: React.FC<TimeProviderProps> = ({
  children,
  coreEndTime,
}) => {
  const router = useRouter();

  const endTime = new Date(coreEndTime);
  const currentTime = new Date();
  const differenceInSeconds = Math.floor(
    (endTime.getTime() - currentTime.getTime()) / 1000,
  );
  const [seconds, setSeconds] = useState<number>(100);

  useEffect(() => {
    const diff = Math.floor((endTime.getTime() - new Date().getTime()) / 1000);
    const timeLeft = Number.isNaN(Number(diff)) ? 3600 : diff;
    setSeconds(timeLeft);
  }, [coreEndTime]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 0) {
          clearInterval(timer);
          alert('코어타임이 끝났습니다.');
          router.back();
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [differenceInSeconds]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(
      2,
      '0',
    )} : ${String(remainingSeconds).padStart(2, '0')}`;
  }, [seconds]);

  const value = useMemo(() => ({ formattedTime }), [formattedTime]);

  return <TimeContext.Provider value={value}>{children}</TimeContext.Provider>;
};

export default TimeProvider;
