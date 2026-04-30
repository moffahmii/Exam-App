import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { changePasswordApi } from "../apis/change-password.api";


export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: ChangePasswordPayload) => {
            return await changePasswordApi(data);
        },
        onSuccess: () => {
            signOut({ redirect: true, callbackUrl: '/login' });
        },
        onError: (error: Error) => {
            console.error("Change Password Error:", error.message);
        }
    });
};