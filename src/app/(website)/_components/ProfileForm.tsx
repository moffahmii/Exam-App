'use client'
import React, { useEffect } from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from 'next-auth/react'
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { Button } from "@/shared/components/ui/button"
import { Pencil, Loader2 } from 'lucide-react'
import { userInfoSchema, type UserInfoValues } from '@/shared/schemas/auth-schema'
interface ProfileFormProps {
    onOpenEmailModal: () => void;
    onOpenDeleteModal: () => void;
    saveProfile: (data: UserInfoValues) => Promise<any>;
    isLoading: boolean;
}

export default function ProfileForm({ onOpenEmailModal, onOpenDeleteModal, saveProfile, isLoading }: ProfileFormProps) {
    const { data: session } = useSession();

    const form = useForm<UserInfoValues>({
        resolver: zodResolver(userInfoSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            username: '',
            phone: ''
        }
    });

    useEffect(() => {
        if (session?.user) {
            form.reset({
                firstName: session.user.firstName || '',
                lastName: session.user.lastName || '',
                username: session.user.username || '',
                phone: session.user.phone || ''
            });
        }
    }, [session, form]);

    const onSubmit = async (data: UserInfoValues) => {
        await saveProfile(data);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 font-mono">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <Controller
                    name="firstName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2" data-invalid={fieldState.invalid}>
                            <Label htmlFor={field.name}>First name</Label>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                className={`h-12 border-slate-200 ${fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                placeholder="Mohamed"
                            />
                            {fieldState.error && (
                                <p className="text-sm font-medium text-red-500">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />

                {/* Last Name */}
                <Controller
                    name="lastName"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <div className="space-y-2" data-invalid={fieldState.invalid}>
                            <Label htmlFor={field.name}>Last name</Label>
                            <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                className={`h-12 border-gray-200 ${fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                                placeholder="Fahmy"
                            />
                            {fieldState.error && (
                                <p className="text-sm font-medium text-red-500">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            {/* Username */}
            <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2" data-invalid={fieldState.invalid}>
                        <Label htmlFor={field.name}>Username</Label>
                        <Input
                            {...field}
                            id={field.name}
                            disabled
                            className="h-12 bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200"
                        />
                        {fieldState.error && (
                            <p className="text-sm font-medium text-red-500">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Email - Display Only */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Email</Label>
                    <button
                        type="button"
                        onClick={onOpenEmailModal}
                        className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                    >
                        <Pencil size={14} /> Change
                    </button>
                </div>
                <Input
                    value={session?.user?.email || ''}
                    disabled
                    className="h-12 bg-gray-200 text-gray-800 border-gray-100"
                />
            </div>

            {/* Phone */}
            <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2" data-invalid={fieldState.invalid}>
                        <Label htmlFor={field.name}>Phone</Label>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            className={`h-12 border-slate-200 ${fieldState.invalid ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                            placeholder="010XXXXXXXX"
                        />
                        {fieldState.error && (
                            <p className="text-sm font-medium text-red-500">{fieldState.error.message}</p>
                        )}
                    </div>
                )}
            />

            {/* Buttons Section */}
            <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-slate-100">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onOpenDeleteModal}
                    className="flex-1 h-14 text-red-600 bg-red-50 hover:bg-red-100 text-sm"
                >
                    Delete My Account
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading || !form.formState.isDirty}
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white text-sm"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin mr-2" />
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </div>
        </form>
    );
}