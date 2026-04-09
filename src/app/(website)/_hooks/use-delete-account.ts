'use client'
import { useState } from 'react'
import { deleteUserAccountAction } from "@/lib/api/dashboard/update-profile.api"
import { signOut } from 'next-auth/react'

export function useDeleteAccount() {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            await deleteUserAccountAction();
            // تسجيل الخروج بعد النجاح
            await signOut({ callbackUrl: '/login' });
            return { success: true };
        } catch (error: any) {
            console.error("Delete Error:", error.message);
            // نعيد الخطأ للمكون ليعرضه بالطريقة المناسبة (مثلاً تحت الزر أو في toast)
            return { success: false, error: error.message };
        } finally {
            setIsDeleting(false);
        }
    }

    return { handleDelete, isDeleting };
}