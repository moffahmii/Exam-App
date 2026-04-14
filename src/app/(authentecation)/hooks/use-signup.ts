'use client'
import { useMutation } from '@tanstack/react-query'
import { signupAction } from '@/lib/api/auth/auth-api'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function useSignup() {
    const router = useRouter()

    return useMutation({
        mutationKey: ['signup'],
        mutationFn: signupAction,
        onSuccess: async (data, variables) => {
            const res = await signIn('credentials', {
                username: variables.username,
                password: variables.password,
                redirect: false,
            })

            if (!res?.ok) {
                throw new Error('Auto login failed')
            }

            router.push('/')
        },

        onError: (error: any) => {
            console.log(error.message)
        },
    })
}