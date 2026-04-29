'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { deleteUserAccountAction } from '../apis/delete-account.api';

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