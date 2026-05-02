'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signupAction } from '../apis/signup.api';

export default function useSignup() {
    const router = useRouter();

    return useMutation({
        mutationKey: ['signup'],
        mutationFn: async (data: Parameters<typeof signupAction>[0]) => {
            const response = await signupAction(data);

            if (response.error) {
                throw new Error(response.error);
            }

            return response.data;
        },
        onSuccess: () => {
            router.push('/login');
        },
        onError: (error: Error) => {
            console.error("Signup Failed:", error.message);
        },
    });
}