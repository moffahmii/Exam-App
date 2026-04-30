import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { requestEmailUpdateOTP } from "../apis/request-otp.api";
import { verifyEmailUpdateOTP } from "../apis/verify-otp.api";

export function useChangeEmail() {
    const [step, setStep] = useState<1 | 2>(1);
    const [timeLeft, setTimeLeft] = useState(0);
    const [email, setEmail] = useState("");

    // ---------------- TIMER ----------------
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    // ---------------- MUTATIONS ----------------
    const requestMutation = useMutation({
        mutationFn: requestEmailUpdateOTP,
        onSuccess: (_, newEmail) => {
            setEmail(newEmail);
            setStep(2);
            setTimeLeft(60);
        },
    });

    const verifyMutation = useMutation({
        mutationFn: verifyEmailUpdateOTP,
    });

    // ---------------- SAFE REQUEST ----------------
    const handleRequest = async (newEmail: string) => {
        try {
            const res = await requestMutation.mutateAsync(newEmail);
            // التأكد من نجاح الـ API بناءً على هيكل IApiResponse
            if (res && res.status === false) {
                return { success: false, error: res.message };
            }
            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to send OTP";
            return { success: false, error: message };
        }
    };

    const handleVerify = async (code: string) => {
        try {
            // نمرر الـ code فقط بشكل مباشر بدون object
            const res = await verifyMutation.mutateAsync(code);

            // قراءة حالة الخطأ من الـ Server Action
            if (res.status === false) {
                return { success: false, error: res.message || "Invalid OTP code" };
            }

            return { success: true };
        } catch (error) {
            const message = error instanceof Error ? error.message : "Invalid or expired OTP";
            return { success: false, error: message };
        }
    };

    // ---------------- RESET ----------------
    const reset = () => {
        setStep(1);
        setTimeLeft(0);
        setEmail("");
        requestMutation.reset();
        verifyMutation.reset();
    };

    return {
        step,
        setStep,
        email,
        timeLeft,
        isLoading: requestMutation.isPending || verifyMutation.isPending,
        handleRequest,
        handleVerify,
        reset,
    };
}