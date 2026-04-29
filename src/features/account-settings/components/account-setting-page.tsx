'use client'
import ChangeEmailModal from '@/features/account-settings/components/ChangeEmailModal'
import DeleteAccountModal from '@/features/account-settings/components/DeleteAccountModal'
import ProfileForm from '@/features/account-settings/components/ProfileForm'
import { useDeleteAccount } from '@/features/account-settings/hooks/use-delete-account'
import { useProfileForm } from '@/features/account-settings/hooks/use-profile-form'
import React, { useState } from 'react'

export default function AccountSetting() {
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
            <ProfileForm
                saveProfile={saveProfile}
                isLoading={isLoading}
                onOpenEmailModal={() => toggleModal('email', true)}
                onOpenDeleteModal={() => toggleModal('delete', true)}
            />
        </div>
    )
}