'use client'
import { useMutation } from '@tanstack/react-query'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoginFields } from '../../types/auth'
export default function useLogin() {
    const router = useRouter()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: async (fields: LoginFields) => {
            const res = await signIn('credentials', {
                username: fields.username,
                password: fields.password,
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