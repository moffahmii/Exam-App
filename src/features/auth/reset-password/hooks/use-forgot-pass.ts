import { useMutation } from "@tanstack/react-query";
import { ForgorPasswordAction } from "../apis/forgot-password.api";

export default function useForgotPassword(onSuccessCallback?: (email: string) => void) {
    const { mutate, isPending, error } = useMutation<any, any, string>({
        mutationKey: ['forgot-password'],
        mutationFn: ForgorPasswordAction,
        onSuccess: (data, variables) => {
            if (onSuccessCallback) {
                onSuccessCallback(variables);
            }
        },
        onError: (error: any) => {
            console.error("Forgot Password Error:", error.message);
        }
    });

    return { isPending, mutate, error };
}