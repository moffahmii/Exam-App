'use client'
import { loginAction } from '@/lib/api/auth/auth-api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function useLogin() {
    const router = useRouter()
    const { isPending, mutate, error } = useMutation({
        mutationKey: ['login'],
        mutationFn: loginAction,
        onSuccess: (data) => {
            console.log(data)
            router.push('/')
        },
        onError: (error) => {
            console.log(error);
        }
    })
    return { isPending, mutate, error }
}
