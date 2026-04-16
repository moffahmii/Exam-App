import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { requestEmailUpdateOTP, verifyEmailUpdateOTP } from "@/lib/api/website/update-profile.api";

export function useChangeEmail() {
    const [step, setStep] = useState(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState("");

    // Timer Logic
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // Mutations
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

    // Reset Function
    const reset = () => {
        setStep(1);
        setTimeLeft(0);
        setEmail("");
        requestMutation.reset();
        verifyMutation.reset();
    };

    // Safe Wrappers لضمان عدم حدوث Crash وتوافقها مع الـ UI
    const handleSafeRequest = async (newEmail: string) => {
        try {
            await requestMutation.mutateAsync(newEmail);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message || "Failed to send OTP. Try again." };
        }
    };

    const handleSafeVerify = async (otp: string) => {
        try {
            await verifyMutation.mutateAsync(otp);
            return { success: true };
        } catch (error: any) {
            return { success: false, error: error.message || "Invalid or expired OTP code." };
        }
    };

    return {
        step,
        setStep, // أضفناها عشان زرار الـ Edit في الكومبوننت يشتغل
        email,
        timeLeft,
        // دمجنا حالات التحميل في متغير واحد عشان الكومبوننت
        isLoading: requestMutation.isPending || verifyMutation.isPending,
        handleRequest: handleSafeRequest, // استخدام الـ Safe Wrapper
        handleVerify: handleSafeVerify,   // استخدام الـ Safe Wrapper
        reset
    };
}