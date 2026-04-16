'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateProfileAction } from "@/lib/api/website/update-profile.api"
import { IUpdateProfileFields } from "@/lib/types/auth"

export function useUpdateProfile() {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (formData: IUpdateProfileFields) => updateProfileAction(formData),

    // 2️⃣ لما العملية تنجح
    onSuccess: (res) => {
      console.log('Update success:', res)

      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },

    // 3️⃣ لما يحصل خطأ
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