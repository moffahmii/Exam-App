'use client'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export default function useLogin() {
    const router = useRouter()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (credentials: any) => {
            const res = await signIn('credentials', {
                username: credentials.username,
                password: credentials.password,
                redirect: false, 
            })
            if (!res?.ok) {
                throw new Error(res?.error || 'Login failed')
            }
            return res
        },
        onSuccess: () => {
            router.push('/')
            router.refresh() 
        },
    })
}