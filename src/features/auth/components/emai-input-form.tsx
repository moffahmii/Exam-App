'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { EmailFormValues, emailSchema } from '@/shared/schemas/auth-schema'
import useEmailVerification from '../hooks/use-verify-email'
import { useRouter } from 'next/navigation' 
import { Loader2 } from 'lucide-react'

export default function EmailInputForm() {
    const router = useRouter()
    const { mutate, isPending, error: serverError } = useEmailVerification()
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })
    const onSubmit = (values: EmailFormValues) => {
        mutate(values.email, {
            onSuccess: () => {
                router.push("/register/verify")
            }
        })
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 ">
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2" data-invalid={fieldState.invalid}>
                        <Label
                            htmlFor={field.name}
                            className={`text-sm font-medium ${fieldState.invalid ? 'text-red-500' : 'text-gray-700'}`}
                        >
                            Email Address
                        </Label>

                        <Input
                            {...field}
                            id={field.name}
                            placeholder="user@example.com"
                            type="email"
                            disabled={isPending}
                            aria-invalid={fieldState.invalid}
                            className={`h-11 transition-all ${fieldState.invalid
                                    ? "border-red-500 focus-visible:ring-red-500"
                                    : "focus-visible:ring-blue-400"
                                }`}
                        />

                        {/* عرض خطأ الـ Validation (Zod) */}
                        {fieldState.error && (
                            <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                                {fieldState.error.message}
                            </p>
                        )}

                        {/* عرض خطأ السيرفر (React Query) */}
                        {serverError && !fieldState.error && (
                            <p className="text-xs text-red-500 font-medium">
                                {(serverError as Error).message}
                            </p>
                        )}
                    </div>
                )}
            />

            <Button
                type="submit"
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
                disabled={isPending}
            >
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin size-4" />
                        Sending code...
                    </div>
                ) : (
                    "Continue"
                )}
            </Button>
        </form>
    )
}