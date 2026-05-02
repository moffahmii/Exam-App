"use client";
import React from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from "js-cookie"
import { Button } from '@/shared/components/ui/button'
import { PasswordFormValues, passwordSchema } from '@/shared/schemas/auth-schema';
import useSignup from '../hooks/use-signup';
import { ErrorResponse } from '@/shared/types/api';
import PasswordInput from '../../../../shared/components/custom/password-Input';
import ErrorAlert from '@/shared/components/custom/ErrorAlert';

export default function PasswordStepForm() {

    const { mutate, isPending, error } = useSignup();
    const { register, handleSubmit, formState: { errors }, } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        mode: "onChange",
    });

    const onSubmit = (values: PasswordFormValues) => {
        const email = Cookies.get("user_email");
        const infoData = JSON.parse(Cookies.get("user_info_step") || "{}");
        const finalPayload = {
            username: infoData.username,
            email: email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            firstName: infoData.firstName,
            lastName: infoData.lastName,
            phone: infoData.phone,
        };
        mutate(finalPayload as any);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
                {/* Password Field */}
                <div className="space-y-1">
                    <PasswordInput
                        label="Password"
                        id="password"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>
                {/* Confirm Password Field */}
                <div className="space-y-1">
                    <PasswordInput
                        label="Confirm Password"
                        id="confirmPassword"
                        placeholder="Confirm your password"
                        {...register("confirmPassword")}
                        error={errors.confirmPassword?.message}
                    />
                </div>
            </div>

            {error && (
                <ErrorAlert message={error.message} />
            )}

            <Button
                type="submit"
                disabled={isPending}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all shadow-md"
            >
                {isPending ? "Creating Account..." : "Create Account"}
            </Button>
        </form>
    );
}