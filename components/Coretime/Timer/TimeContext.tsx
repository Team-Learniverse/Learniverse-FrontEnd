import { createContext } from 'react';

interface TimeContextType {
  formattedTime: string;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export default TimeContext;
