'use client'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Pencil } from 'lucide-react'

// Hooks & Sub-components
import { useProfileForm } from '../../_hooks/use-profile-form'
import { useDeleteAccount } from '../../_hooks/use-delete-account'
import ChangeEmailModal from '../../_components/ChangeEmailModal'
import DeleteAccountModal from '../../_components/DeleteAccountModal'

export default function ProfileForm() {
  // Logic Hooks
  const { formData, handleChange, saveProfile, isLoading } = useProfileForm()
  const { handleDelete, isDeleting } = useDeleteAccount()

  // UI States
  const [modals, setModals] = useState({ email: false, delete: false })

  const toggleModal = (key: 'email' | 'delete', state: boolean) =>
    setModals(prev => ({ ...prev, [key]: state }))

  const confirmDelete = async () => {
    const result = await handleDelete()
    if (result.success) toggleModal('delete', false)
  }

  return (
    <>
      {/*  Modals Section */}
      <ChangeEmailModal
        isOpen={modals.email}
        onClose={() => toggleModal('email', false)}
        currentEmail={formData.email}
      />

      <DeleteAccountModal
        isOpen={modals.delete}
        onClose={() => toggleModal('delete', false)}
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />

      {/*  Main Form Section */}
      <form onSubmit={saveProfile} className="space-y-6 bg-white p-6 h-full border border-slate-100 shadow-sm font-mono text-left">

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormGroup id="firstName" label="First name" value={formData.firstName} onChange={handleChange} />
          <FormGroup id="lastName" label="Last name" value={formData.lastName} onChange={handleChange} />
        </div>

        {/* Username Field */}
        <FormGroup id="username" label="Username" value={formData.username} disabled className="bg-slate-50 text-slate-500 cursor-not-allowed" />

        {/* Email Field with custom "Change" button */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="email">Email</Label>
            <button
              type="button"
              onClick={() => toggleModal('email', true)}
              className="text-blue-600 text-sm flex items-center gap-1 hover:underline font-bold"
            >
              <Pencil size={14} /> Change
            </button>
          </div>
          <Input id="email" type="email" value={formData.email} readOnly className="h-12 border-slate-200 bg-slate-50" />
        </div>

        {/* Phone Field */}
        <FormGroup id="phone" label="Phone" value={formData.phone} onChange={handleChange} />

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => toggleModal('delete', true)}
            className="flex-1 h-12 text-red-600 bg-red-50 hover:bg-red-100 border-transparent font-bold transition-all"
          >
            Delete My Account
          </Button>

          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold"
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </>
  )
}

function FormGroup({ id, label, value, onChange, disabled, type = "text", className = "" }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} disabled={disabled} className={`h-12 border-slate-200 ${className}`} />
    </div>
  )
}