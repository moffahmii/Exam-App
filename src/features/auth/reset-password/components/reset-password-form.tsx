'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import useResetPassword from "../hooks/use-reset-password";

import {
    passwordSchema,
    PasswordFormValues,
} from "@/shared/schemas/auth-schema";

import PasswordInput from "@/shared/components/custom/password-Input";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/shared/components/ui/field";

export default function ResetPasswordForm({
    token,
}: {
    token: string | null;
}) {
    const { mutate, isPending, error } = useResetPassword();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: PasswordFormValues) => {
        if (!token) return;

        mutate({
            token,
            newPassword: data.password,
            confirmPassword: data.confirmPassword,
        });
    };

    return (
        <div className="w-full max-w-lg space-y-8">

            {/* HEADER */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">
                    Create a New Password
                </h1>

                <p className="text-gray-500">
                    Create a new strong password for your account.
                </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* PASSWORD */}
                <FieldGroup>
                    <Field data-invalid={!!errors.password}>

                        <FieldLabel>
                            New Password
                        </FieldLabel>

                        <PasswordInput
                            placeholder="********"
                            {...register("password")}
                            error={errors.password?.message}
                        />

                    </Field>
                </FieldGroup>

                {/* CONFIRM PASSWORD */}
                <FieldGroup>
                    <Field data-invalid={!!errors.confirmPassword}>

                        <FieldLabel>
                            Confirm Password
                        </FieldLabel>

                        <PasswordInput
                            placeholder="********"
                            {...register("confirmPassword")}
                            error={errors.confirmPassword?.message}
                        />

                    </Field>
                </FieldGroup>

                {/* API ERROR */}
                {error && (
                    <p className="text-sm text-red-500">
                        {error.message}
                    </p>
                )}

                {/* SUBMIT */}
                <Button
                    type="submit"
                    disabled={isPending || !token || !isValid}
                    className="w-full h-11"
                >
                    {isPending ? "Processing..." : "Reset Password"}
                </Button>

                {/* FOOTER */}
                <p className="text-center text-sm text-slate-600 pt-4">
                    Don't have an account?{" "}
                    <Link
                        href="/register"
                        className="text-blue-600 font-medium"
                    >
                        Create yours
                    </Link>
                </p>
            </form>
        </div>
    );
}