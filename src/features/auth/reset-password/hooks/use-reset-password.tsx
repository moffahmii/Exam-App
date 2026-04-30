import { useMutation } from '@tanstack/react-query';
import { ResetPasswordAction } from '../apis/reset-password.api';

export default function useResetPassword(onSuccessCallback?: () => void) {
    const { mutate, isPending, error } = useMutation({
        mutationKey: ['reset-password'],
        mutationFn: ResetPasswordAction,
        onSuccess: (data) => {
            console.log('Password reset successfully:', data);
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error) => {
            console.error('Failed to reset password:', error);
        }
    });

    return { mutate, isPending, error };
}