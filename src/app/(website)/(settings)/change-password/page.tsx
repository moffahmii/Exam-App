'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react'
// import { changePasswordAction } from './action'
// import { toast } from 'sonner'
import PasswordInput from '@/app/(authentecation)/_components/password-Input'

export default function ChangePasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setErrors({});

    //     // Validation بسيط (يمكنك استبداله بـ Zod لاحقاً)
    //     if (formData.newPassword !== formData.confirmPassword) {
    //         setErrors({ confirmPassword: "Passwords do not match" });
    //         return;
    //     }

    //     setIsLoading(true);
    //     try {
    //         await changePasswordAction({
    //             oldPassword: formData.oldPassword,
    //             newPassword: formData.newPassword
    //         });
    //         toast.success("Password updated successfully");
    //         setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    //     } catch (err: any) {
    //         toast.error(err.message);
    //         setErrors({ general: err.message });
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <div className="p-8 bg-white h-full font-mono">
            <form  className="space-y-6">
                <PasswordInput
                    label="Current Password"
                    id="oldPassword"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
                />
                <PasswordInput
                    label="New Password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                />
                <PasswordInput
                    label="Confirm New Password"
                    id="confirmPassword"
                    error={errors.confirmPassword}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <Button
                    disabled={isLoading}
                    className="w-full h-12 bg-blue-600  text-white font-medium text-sm rounded-none  mt-4"
                >
                    {isLoading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" /> Updating...
                        </span>
                    ) : "Update Password"}
                </Button>
            </form>
        </div>
    );
}