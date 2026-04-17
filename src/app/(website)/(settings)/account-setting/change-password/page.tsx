// app/(authentecation)/change-password/page.tsx
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
import PasswordInput from '@/features/auth/components/password-Input'
import { useChangePassword } from '../../../_hooks/use-change-password'

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // عشان الخطأ يظهر تحت حقل التأكيد بس
});
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export default function ChangePasswordPage() {
    const { mutate: changePassword, isPending } = useChangePassword();
    const { register, handleSubmit, formState: { errors } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    const onSubmit = (data: ChangePasswordFormValues) => {
        changePassword(data);
    };

    return (
        <div className="p-8 bg-white h-full font-mono">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <PasswordInput
                    label="Current Password"
                    id="currentPassword"
                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                />
                <PasswordInput
                    label="New Password"
                    id="newPassword"
                    error={errors.newPassword?.message}
                    {...register('newPassword')}
                />
                <PasswordInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    error={errors.confirmPassword?.message}
                    {...register('confirmPassword')}
                />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 bg-blue-600 text-white font-medium text-sm rounded-none mt-4"
                >
                    {isPending ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" /> Updating...
                        </span>
                    ) : "Update Password"}
                </Button>
                
            </form>
        </div>
    );
}