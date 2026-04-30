"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";

import PasswordResetSent from "./password-reset-sent";
import useForgotPassword from "../hooks/use-forgot-pass";

import {
    emailSchema,
    EmailFormValues,
} from "@/shared/schemas/auth-schema";

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldError,
} from "@/shared/components/ui/field";

export default function ForgotPasswordForm() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState("");

    const { mutate, isPending, error } = useForgotPassword((sentEmail) => {
        setEmail(sentEmail);
        setIsSent(true);
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<EmailFormValues>({
        resolver: zodResolver(emailSchema),
        defaultValues: {
            email: "",
        },
        mode: "onChange",
    });

    const onSubmit = (data: EmailFormValues) => {
        mutate(data.email);
    };

    if (isSent) {
        return <PasswordResetSent email={email} />;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL FIELD */}
            <FieldGroup>
                <Field data-invalid={!!errors.email}>

                    <FieldLabel htmlFor="email">
                        Email Address
                    </FieldLabel>

                    <Input
                        id="email"
                        type="email"
                        placeholder="user@example.com"
                        disabled={isPending}
                        {...register("email")}
                        className="h-11 border-slate-200 focus-visible:ring-blue-500"
                    />

                    {errors.email && (
                        <FieldError
                            errors={[errors.email]}
                        />
                    )}
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
                disabled={isPending || !isValid}
                className="w-full h-11"
            >
                {isPending ? "Sending..." : "Send Reset Link"}
            </Button>
        </form>
    );
} 