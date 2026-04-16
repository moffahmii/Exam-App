'use client'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction } from "@/lib/api/website/update-profile.api"
import { UserInfoValues } from '@/lib/schemas/auth-schema'

export function useProfileForm() {
    const { data: session, update } = useSession()
    const queryClient = useQueryClient()

    // استخدام React Query Mutation
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: UserInfoValues) => updateProfileAction({
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            profilePhoto: '' // لو حابب تضيفها لاحقاً
        }),
        onSuccess: async (res, variables) => {
            // 1. تحديث الـ Session في NextAuth
            await update({
                ...session,
                user: { ...session?.user, ...variables }
            })
            queryClient.invalidateQueries({ queryKey: ['user-profile'] })

        },
        onError: (error: any) => {
        }
    })

    const saveProfile = async (data: UserInfoValues) => {
        return await mutateAsync(data)
    }

    return {
        saveProfile,
        isLoading: isPending 
    }
}