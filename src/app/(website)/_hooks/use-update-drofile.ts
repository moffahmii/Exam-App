'use client'

import { useState } from 'react'
import { updateProfileAction } from "@/lib/api/website/update-profile.api"
import { IUpdateProfileFields } from "@/lib/types/auth"

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false)

  const mutate = async (formData: IUpdateProfileFields) => {
    setIsLoading(true)
    try {
      // 1️⃣ طباعة البيانات قبل الإرسال
      console.log('Submitting formData:', formData)

      const res = await updateProfileAction(formData)

      // 3️⃣ طباعة response من الباك
      console.log('Update success:', res)
      return { success: true, data: res.payload }

    } catch (error: any) {
      // 4️⃣ طباعة أي خطأ يحصل
      console.error('Update failed:', error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  return { mutate, isLoading }
}