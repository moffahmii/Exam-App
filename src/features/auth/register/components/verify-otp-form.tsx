"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";

import useOTPVerification from "../hooks/use-otp-verification";
import { otpSchema, OTPFormValues } from "@/shared/schemas/auth-schema";

export default function OTPForm({ email }: { email: string }) {
    const { mutate, isPending, error } = useOTPVerification();

    const form = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: "" },
    });

    const onSubmit = (data: OTPFormValues) => {
        mutate({ email, code: data.otp });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <Controller
                name="otp"
                control={form.control}
                render={({ field }) => (
                    <InputOTP maxLength={6} value={field.value} onChange={field.onChange}>
                        <div className="flex gap-2">
                            {[0, 1, 2, 3, 4, 5].map(i => (
                                <InputOTPGroup key={i}>
                                    <InputOTPSlot index={i} />
                                </InputOTPGroup>
                            ))}
                        </div>
                    </InputOTP>
                )}
            />

            {form.formState.errors.otp && (
                <p className="text-red-500 text-sm">
                    {form.formState.errors.otp.message}
                </p>
            )}

            {error && (
                <p className="text-red-500 text-sm">
                    {error.message}
                </p>
            )}

            <Button type="submit" disabled={isPending}>
                {isPending ? "Verifying..." : "Verify OTP"}
            </Button>
        </form>
    );
}