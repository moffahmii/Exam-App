// src/hooks/use-otp-verification.ts
import { verifyOTPAction } from "@/lib/api/auth/auth-api";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useOTPVerification() {
    const router = useRouter();

    return useMutation({
        mutationKey: ['Verify OTP'],
        mutationFn: verifyOTPAction,
        onSuccess: (data) => {
            // 1. تحديث المرحلة في الكوكيز لـ completed
            Cookies.set("auth_stage", "completed", { expires: 1 / 24 });

            // 2. نقله لآخر خطوة
            router.push("/register/complete");
        },
        onError: (error: any) => {
            console.error("OTP Error:", error.message);
        }
    });
}