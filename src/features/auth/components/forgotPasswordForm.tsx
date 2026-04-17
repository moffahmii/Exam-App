"use client"
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Mail, Loader2, ArrowRight } from 'lucide-react'
import useForgotPassword from '../hooks/use-forgot-pass'
import { EmailFormValues, emailSchema } from '@/shared/schemas/auth-schema'

export default function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })
    const { mutate, isPending, error: serverError } = useForgotPassword((email: string) => {
        onSent(email)
    })
    const onSubmit = (values: EmailFormValues) => {
        mutate(values.email)
    }
    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <div className="space-y-2">
                        <Label
                            htmlFor={field.name}
                            className={fieldState.invalid ? "text-red-500" : ""}
                        >
                            Email Address
                        </Label>
                        <div className="relative">
                            <Mail className={cn(
                                "absolute left-3 top-3 h-5 w-5 transition-colors",
                                fieldState.invalid ? "text-red-400" : "text-slate-400"
                            )} />
                            <Input
                                {...field}
                                id={field.name}
                                type="email"
                                disabled={isPending}
                                placeholder="you@example.com"
                                className={cn(
                                    "h-11 pl-10 border-gray-200 focus-visible:ring-blue-500 transition-all",
                                    fieldState.invalid && "border-red-500 focus-visible:ring-red-500"
                                )}
                            />
                        </div>
                        {fieldState.error && (
                            <p className="text-xs text-red-500 font-medium animate-in fade-in slide-in-from-top-1">
                                {fieldState.error.message}
                            </p>
                        )}
                    </div>
                )}
            />
            {serverError && (
                <p className="text-sm text-red-600 bg-red-50 p-2 border border-red-200 text-center rounded-md animate-in zoom-in-95">
                    {serverError.message}
                </p>
            )}
            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
                {isPending ? (
                    <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin size-4" />
                        <span>Sending...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        Continue <ArrowRight className="w-4 h-4" />
                    </div>
                )}
            </Button>
        </form>
    )
}
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}