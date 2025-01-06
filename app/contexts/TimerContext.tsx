'use client';
import { createContext, ReactNode, useState } from 'react';

export interface Time {
    format: string;
    number: number;
}
export interface TimerContextProps {
    isRunning: boolean;
    time: Time;
    toggleTimer: (status?: boolean) => void; // 아무것도 리턴하지 않는 함수임
}
// Context 생성
const TimerContext = createContext<TimerContextProps | undefined>(undefined);

// Provider 컴포넌트 정의
export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [time] = useState<Time>({
        format: '0:0',
        number: 0,
    });

    const toggleTimer = (status?: boolean): void => {
        if (status !== undefined) {
            setIsRunning(status);
        } else {
            setIsRunning((prev) => !prev);
        }
    };
    return <TimerContext.Provider value={{ isRunning, toggleTimer, time }}>{children}</TimerContext.Provider>;
};

export default TimerContext;
