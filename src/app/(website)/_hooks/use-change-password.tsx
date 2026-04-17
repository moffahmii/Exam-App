import { ChangePasswordAction } from "@/features/auth/apis/auth-api";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

interface ChangePasswordPayload {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: ChangePasswordPayload) => {
            return await ChangePasswordAction(data);
        },
        onSuccess: () => {
            signOut({ redirect: true, callbackUrl: '/login' });
        },
        onError: (error: Error) => {
            console.error("Change Password Error:", error.message);
        }
    });
};