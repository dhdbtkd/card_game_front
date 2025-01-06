import { useContext } from 'react';
import TimerContext, { TimerContextProps } from '../contexts/TimerContext';

// Context 데이터를 사용하는 커스텀 훅 정의
export const useTimer = (): TimerContextProps => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error('useTimer must be within TimerContext');
    }
    return context;
};
