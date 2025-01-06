import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';

import { useTimer } from '../hooks/useTimer';

export interface TimerHandle {
    resetTimer: () => void;
}

const Timer = forwardRef<TimerHandle>((props, ref) => {
    const [time, setTime] = useState<number>(0);
    // const [isRunning, setIsRunning] = useState<boolean>(false);
    const intervalId = useRef<NodeJS.Timeout | undefined>(undefined);
    const { isRunning, time: timeValue } = useTimer();
    const startTimestamp = useRef<number | null>(null);
    useImperativeHandle(ref, () => ({
        resetTimer: (): void => setTime(0), // 타이머 초기화 함수 제공
    }));

    useEffect(() => {
        if (isRunning) {
            startTimestamp.current = performance.now();
            intervalId.current = setInterval(() => {
                if (startTimestamp.current !== null) {
                    const elapsed = performance.now() - startTimestamp.current;
                    setTime(Math.floor(elapsed)); // 경과 시간을 ms 단위로 업데이트
                    timeValue.format = formatTime(Math.floor(elapsed));
                }
            }, 10); // 10ms 간격으로 충분히 정확히 동작
        } else {
            clearInterval(intervalId.current!);
            intervalId.current = undefined;
            startTimestamp.current = null;
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
            }
        };
    }, [isRunning]);

    const formatTime = (ms: number): string => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = ms % 1000;
        return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    };

    return (
        <div>
            <h1>{formatTime(time)}</h1>
        </div>
    );
});

Timer.displayName = 'Timer';

export default Timer;
