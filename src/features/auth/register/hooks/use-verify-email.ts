import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { verifyEmailAction } from "../apis/verify-email.api";

export default function useEmailVerification() {
    const router = useRouter()
    const { isPending, mutate, error } = useMutation({
        mutationKey: ['Email Verify'],
        mutationFn: verifyEmailAction,
        onSuccess: (data, variables) => {
            const emailSent = variables;
            document.cookie = `user_email=${emailSent}; path=/; max-age=3600`;
            document.cookie = "auth_stage=verify; path=/; max-age=3600";
        },
    });
    return { isPending, mutate, error };
}