import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { ChangeEmailFormData } from '@/lib/schemas/auth-schema';

interface EmailStepProps {
    form: UseFormReturn<ChangeEmailFormData>;
}

export function EmailStep({ form }: EmailStepProps) {
    const { register, formState: { errors }, clearErrors } = form;

    return (
        <>
            <h4 className="text-2xl font-bold text-blue-600 font-inter">Enter your new email</h4>
            <div className="mt-8 space-y-2 text-left font-mono">
                <Label className="text-base font-medium text-gray-800">Email</Label>
                <Input
                    type="email"
                    placeholder="user@example.com"
                    {...register("email", { onChange: () => clearErrors("email") })}
                    className={`h-12 p-2.5 border-gray-200 focus-visible:ring-blue-600 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''
                        }`}
                />
                {errors.email && (
                    <p className="text-xs text-red-600 mt-1 animate-in fade-in slide-in-from-top-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
        </>
    );
}