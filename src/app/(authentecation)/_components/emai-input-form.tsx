'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmailFormValues, emailSchema } from '@/lib/schemas/auth-schema'
import useEmailVerification from '../hooks/use-verify-email'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/router'

export default function EmailInputForm() {

    const router = useRouter()
    
    const { mutate, isPending, error } = useEmailVerification()
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })

    const onSubmit = (values: EmailFormValues) => {
        mutate(values.email)
        router.push("/register/verify")
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4 font-mono">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                </Label>
                <Input
                    {...form.register("email")} 
                    id="email"
                    placeholder="user@example.com"
                    type="email"
                    disabled={isPending}
                    className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500 h-11" : " h-11"}
                />
                {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}
                {error && (
                    <p className="text-xs text-red-500">{(error as Error).message}</p>
                )}
            </div>
            <Button
                type="submit"
                className="w-full h-11 "
                disabled={isPending}
            >
                {isPending ? "Sending code..." : "Continue"}
            </Button>
        </form>
    )
}