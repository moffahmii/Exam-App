'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction } from "@/features/account-settings/apis/update-profile.api"
import { IUpdateProfileFields } from "@/lib/types/auth"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: IUpdateProfileFields) => updateProfileAction(formData),
    onSuccess: (res) => {
      console.log('Update success:', res)
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError: (error: any) => {
      console.error('Update failed:', error)
    },
    onMutate: (variables) => {
      console.log('Submitting formData:', variables)
    }
  })
  return {
    mutate: mutateAsync,
    isLoading: isPending
  }
}