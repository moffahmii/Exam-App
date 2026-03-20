'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EmailFormValues, emailSchema } from '@/lib/schemas/auth-schema'
import useEmailVerification from '../hooks/use-verify-email'
import { Label } from '@/components/ui/label'

export default function EmailInputForm() {
    // 1. منادي الهوك بتاعنا
    const { mutate, isPending, error } = useEmailVerification()

    // 2. بنعرف الفورم وبنربطه بالـ Schema (Zod)
    const form = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "" },
    })

    // 3. الفانكشن اللي بتشتغل لما الفورم يكون سليم (Valid)
    const onSubmit = (values: EmailFormValues) => {
        mutate(values.email)
    }

    return (
        /* handleSubmit دي وظيفتها تعمل Validate الأول وبعدين تنادي الـ onSubmit بتاعتك */
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address
                </Label>
                
                <Input
                    {...form.register("email")} // دي أهم حتة بتربط الـ Input بـ react-hook-form
                    id="email"
                    placeholder="user@example.com"
                    type="email"
                    disabled={isPending}
                    className={form.formState.errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />

                {/* عرض رسالة الخطأ لو الـ Validation فشل */}
                {form.formState.errors.email && (
                    <p className="text-xs text-red-500">{form.formState.errors.email.message}</p>
                )}

                {/* عرض رسالة الخطأ لو الـ API رجعت Error */}
                {error && (
                    <p className="text-xs text-red-500">{(error as Error).message}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isPending}
            >
                {isPending ? "Sending code..." : "Continue"}
            </Button>
        </form>
    )
}