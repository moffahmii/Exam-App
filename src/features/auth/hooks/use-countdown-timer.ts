import { useState, useEffect, useCallback } from "react";

export function useCountdownTimer(initialTime: number = 60) {
    const [timer, setTimer] = useState(initialTime);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timer === initialTime]);

    const resetTimer = useCallback(() => {
        setTimer(initialTime);
        setCanResend(false);
    }, [initialTime]);

    return { timer, canResend, resetTimer };
}