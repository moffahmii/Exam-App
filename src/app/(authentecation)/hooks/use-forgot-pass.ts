import { ForgorPasswordAction } from '@/lib/api/auth/auth-api'
import { useMutation } from '@tanstack/react-query'
export default function useForgotPassword(onSuccessCallback?: (email: string) => void) {
    const { mutate, isPending, error } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: ForgorPasswordAction,
        onSuccess: (data, variables) => {
            console.log(data);
            if (onSuccessCallback) {
                onSuccessCallback(variables as string);
            }
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return { isPending, mutate, error };
}