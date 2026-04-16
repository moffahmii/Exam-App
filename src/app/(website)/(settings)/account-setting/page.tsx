'use client'
import React, { useState } from 'react'
import { useProfileForm } from '../../_hooks/use-profile-form'
import { useDeleteAccount } from '../../_hooks/use-delete-account'
import ChangeEmailModal from '../../_components/ChangeEmailModal'
import DeleteAccountModal from '../../_components/DeleteAccountModal'
import ProfileForm from '../../_components/ProfileForm'

export default function AccountSetting() {
  // 1. شيلنا formData و handleChange لأن الـ Form هو اللي هيهندلهم بالـ Controller
  const { saveProfile, isLoading } = useProfileForm()
  const { handleDelete, isDeleting } = useDeleteAccount()
  const [modals, setModals] = useState({ email: false, delete: false })

  const toggleModal = (key: 'email' | 'delete', state: boolean) =>
    setModals(prev => ({ ...prev, [key]: state }))

  return (
    <div className="container mx-auto p-6 min-h-screen bg-white">
      <ChangeEmailModal
        isOpen={modals.email}
        onClose={() => toggleModal('email', false)}
      />

      <DeleteAccountModal
        isOpen={modals.delete}
        onClose={() => toggleModal('delete', false)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />

      {/* الـ ProfileForm دلوقتي بياخد بس الـ Actions والـ Loading state */}
      <ProfileForm
        saveProfile={saveProfile}
        isLoading={isLoading}
        onOpenEmailModal={() => toggleModal('email', true)}
        onOpenDeleteModal={() => toggleModal('delete', true)}
      />
    </div>
  )
}