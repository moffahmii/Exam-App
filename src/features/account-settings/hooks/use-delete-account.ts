'use client'
import { useState } from 'react'
import { deleteUserAccountAction } from "@/features/account-settings/apis/update-profile.api"
import { signOut } from 'next-auth/react'

export function useDeleteAccount() {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUserAccountAction();
            await signOut({ callbackUrl: '/login' });
            return { success: true };
        } catch (error: any) {
            console.error("Delete Error:", error.message);
            return { success: false, error: error.message };
        } finally {
            setIsDeleting(false);
        }
    }

    return { handleDelete, isDeleting };
}