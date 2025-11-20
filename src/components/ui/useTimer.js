// src/hooks/useTimer.js
import { useEffect, useState, useRef } from "react";

export default function useTimer(duration, onEnd) {
    const [timeLeft, setTimeLeft] = useState(duration);
    const intervalRef = useRef(null);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(intervalRef.current);
                    onEnd && onEnd();
                    return 0;
                }
                return t - 1;
            });
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    return timeLeft;
}
