import { useState, useEffect } from 'react';
import { requestEmailUpdateOTP, verifyEmailUpdateOTP } from "@/lib/api/dashboard/update-profile.api";

export function useChangeEmail() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    // تنفيذ الخطوة الأولى (طلب الكود)
    // داخل useChangeEmail.ts
    const handleRequest = async (newEmail: string) => {
        if (!newEmail) return { success: false, error: "Email is required" };
        setIsLoading(true);
        try {
            await requestEmailUpdateOTP(newEmail);
            setStep(2);
            setTimeLeft(60);
            return { success: true }; // نرجع كائن نجاح
        } catch (error: any) {
            // هنا نمسك رسالة الخطأ من الباك-أند
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    // تنفيذ الخطوة الثانية (التأكيد)
    const handleVerify = async (otp: string) => {
        if (otp.length < 6) return { success: false };

        setIsLoading(true);
        try {
            // أرسلنا الإيميل فاضي كبرامتر ثاني بناءً على تعديلك الأخير
            const res = await verifyEmailUpdateOTP(otp);
            return { success: true, data: res.data };
        } catch (error: any) {
            console.error("Verify OTP Error:", error.message);
            return { success: false, error: error.message };
        } finally {
            setIsLoading(false);
        }
    };

    const reset = () => {
        setStep(1);
        setTimeLeft(0);
    };

    return {
        step,
        setStep,
        isLoading,
        timeLeft,
        handleRequest,
        handleVerify,
        reset
    };
}