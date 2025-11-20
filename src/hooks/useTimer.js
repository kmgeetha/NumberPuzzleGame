import { useEffect, useState, useRef } from "react";

export default function useTimer(initialSeconds = 60, onExpire = () => {}) {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          onExpire();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const reset = (seconds) => {
    clearInterval(timerRef.current);
    setTimeLeft(seconds);
  };

  return { timeLeft, reset };
}
