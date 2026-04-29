'use client'

import { useMutation } from '@tanstack/react-query'
import { updateProfileAction } from "@/features/account-settings/apis/update-profile.api"
import { IUpdateProfileFields } from '../types/profile-fields'
import { signOut } from "next-auth/react"

export function useUpdateProfile() {
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: IUpdateProfileFields) => updateProfileAction(data),

    onSuccess: async (res) => {
      if (!res.status) return

      // ✅ logout + redirect
      await signOut({ callbackUrl: "/login" })
    },
  })

  return {
    mutate: mutateAsync,
    isLoading: isPending
  }
}