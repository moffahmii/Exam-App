"use client";

import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/shared/components/ui/field";

import ErrorAlert from "@/shared/components/custom/ErrorAlert";

import useLogin from "../hooks/use-login";
import { loginSchema, LoginFormValues } from "@/shared/schemas/auth-schema";
import PasswordInput from "@/shared/components/custom/password-Input";

export default function LoginForm() {
    const { mutate, isPending, error } = useLogin();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    return (
        <form onSubmit={form.handleSubmit(mutate)} className="space-y-6">

            {/* USERNAME */}
            <FieldGroup>
                <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Username</FieldLabel>

                            <Input
                                className="h-10"
                                placeholder="user123"
                                {...field} autoComplete="username" />

                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            {/* PASSWORD */}
            <FieldGroup>
                <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel>Password</FieldLabel>

                            <PasswordInput
                                placeholder="*********"
                                {...field} autoComplete="current-password" />

                            {fieldState.error && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="text-right">
                <Link href="/forgot-password" className="text-blue-600">
                    Forgot password?
                </Link>
            </div>

            {error && <ErrorAlert message={error.message} />}

            <Button type="submit" disabled={isPending} className="w-full h-10">
                {isPending ? "Logging in..." : "Login"}
            </Button>
        </form>
    );
} 