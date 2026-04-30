import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { verifyOTPAction } from "../apis/verify-otp.api";

export default function useOTPVerification() {
    const router = useRouter();

    return useMutation({
        mutationKey: ['Verify OTP'],
        mutationFn: verifyOTPAction,
        onSuccess: (data) => {
            Cookies.set("auth_stage", "completed", { expires: 1 / 24 });
            router.push("/register/complete");
        },
        onError: (error: any) => {
            console.error("OTP Error:", error.message);
        }
    });
}