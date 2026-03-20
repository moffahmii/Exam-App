import { ForgorPasswordAction } from '@/lib/api/auth/auth-api'
import { useMutation } from '@tanstack/react-query'
import React, { use } from 'react'


export default function useForgotPassword(onSuccessCallback?: () => void) {
    const { mutate, isPending, error } = useMutation({
        mutationKey: ['forgot-password'],
        mutationFn: ForgorPasswordAction,
        onSuccess: (data) => {
            console.log(data);
            if (onSuccessCallback) {
                onSuccessCallback();
            }
        },
        onError: (error) => {
            console.log(error);
        }
    });

    return { isPending, mutate, error };
}