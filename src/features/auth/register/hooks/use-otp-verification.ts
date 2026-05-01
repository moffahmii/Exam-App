import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { verifyOTPAction } from "../apis/verify-otp.api";

export default function useOTPVerification() {
    const router = useRouter();

    return useMutation({
        mutationKey: ['Verify OTP'],
        mutationFn: async (data: { email: string; code: string }) => {
            const result = await verifyOTPAction(data);

            if (!result.success) {
                throw new Error(result.message);
            }

            return result.data;
        },
        onSuccess: () => {
            Cookies.set("auth_stage", "completed", { expires: 1 / 24 });
            router.push("/register/complete");
        },
        onError: (error: Error) => {
            console.error("OTP Error:", error.message);
        }
    });
}