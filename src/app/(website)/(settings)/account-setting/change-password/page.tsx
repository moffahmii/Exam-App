// app/(authentecation)/change-password/page.tsx
'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import PasswordInput from '@/features/auth/components/password-Input'
import { useChangePassword } from '@/features/change-password/hooks/use-change-password'
import { ChangePasswordFormValues, changePasswordSchema } from '@/shared/schemas/auth-schema'
import { Button } from '@/shared/components/ui/button'



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
                    placeholder='*********'

                    error={errors.currentPassword?.message}
                    {...register('currentPassword')}
                />
                <PasswordInput
                    label="New Password"
                    id="newPassword"
                    placeholder='*********'

                    error={errors.newPassword?.message}
                    {...register('newPassword')}
                />
                <PasswordInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    placeholder='*********'
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