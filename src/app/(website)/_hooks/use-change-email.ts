import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestEmailUpdateOTP, verifyEmailUpdateOTP } from "@/lib/api/website/update-profile.api";

export function useChangeEmail() {
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState(""); 

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const requestMutation = useMutation({
        mutationFn: (newEmail: string) => requestEmailUpdateOTP(newEmail),
        onSuccess: (_, newEmail) => {
            setEmail(newEmail);
            setStep(2);
            setTimeLeft(60);
        }
    });

    const verifyMutation = useMutation({
        mutationFn: (otp: string) => verifyEmailUpdateOTP(otp),
    });

    const reset = () => {
        setStep(1);
        setTimeLeft(0);
        setEmail("");
        requestMutation.reset();
        verifyMutation.reset();
    };

    return {
        step,
        email,
        timeLeft,
        isRequesting: requestMutation.isPending,
        isVerifying: verifyMutation.isPending,
        requestError: requestMutation.error?.message,
        verifyError: verifyMutation.error?.message,
        handleRequest: requestMutation.mutateAsync,
        handleVerify: verifyMutation.mutateAsync,
        reset
    };
}