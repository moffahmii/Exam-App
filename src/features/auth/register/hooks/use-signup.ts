'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { ErrorResponse } from '@/shared/types/api'
import { signupAction } from '../apis/signup.api'

export default function useSignup() {
    const router = useRouter()

    return useMutation({
        mutationKey: ['signup'],
        mutationFn: signupAction,

        onSuccess: () => {
            router.push('/login')
        },

        onError: (error: ErrorResponse) => {
            console.log(error.message)
        },
    })
}