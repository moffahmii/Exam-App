'use client'
import { useSession } from 'next-auth/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction } from "@/features/account-settings/apis/update-profile.api"
import { UserInfoValues } from '@/shared/schemas/auth-schema'

export function useProfileForm() {
    const { data: session, update } = useSession()
    const queryClient = useQueryClient()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: UserInfoValues) => updateProfileAction({
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            profilePhoto: ""
        }),
        onSuccess: async (res, variables) => {
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