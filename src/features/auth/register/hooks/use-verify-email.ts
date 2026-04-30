import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { verifyEmailAction, } from "../apis/verify-email.api";
type VerifyEmailPayload = {
    email: string;
};

export default function useEmailVerification() {
    return useMutation({
        mutationKey: ['Email Verify'],

        mutationFn: (payload: VerifyEmailPayload) => verifyEmailAction(payload.email),
        onSuccess: (data, variables: VerifyEmailPayload) => {
            Cookies.set("user_email", variables.email, { expires: 1 / 24 });
            Cookies.set("auth_stage", "verify", { expires: 1 / 24 });
        },
        onError: (error: any) => {
            console.error("Email verification error:", error?.message);
        }
    });
}