"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";
import { Field, FieldError, FieldGroup } from "@/shared/components/ui/field";

import ErrorAlert from "@/shared/components/custom/ErrorAlert";

import useOTPVerification from "../hooks/use-otp-verification";
import useEmailVerification from "../hooks/use-verify-email";

import { otpSchema, OTPFormValues } from "@/shared/schemas/auth-schema";
import { useCountdownTimer } from "../hooks/use-countdown-timer";

export default function OTPForm({ email }: { email: string }) {
    const { mutate, isPending, error } = useOTPVerification();
    const { mutate: resendCode, isPending: isResending } = useEmailVerification();

    const { timer, canResend, resetTimer } = useCountdownTimer(60);

    const form = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        mode: "onChange",
        defaultValues: {
            otp: "",
        },
    });

    const onSubmit = (data: OTPFormValues) => {
        if (!email) return;
        mutate({ email, code: data.otp });
    };

    const handleResend = () => {
        if (!email) return;
        resendCode({ email }, {
            onSuccess: () => {
                resetTimer();
                form.reset();
            }
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            <FieldGroup>
                <Controller
                    name="otp"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid} className="flex flex-col items-center">
                            <InputOTP
                                maxLength={6}
                                {...field} 
                            >
                                <div className="flex gap-2 justify-center w-full">
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <InputOTPGroup key={i}>
                                            <InputOTPSlot index={i} className="w-10 h-10 text-lg" />
                                        </InputOTPGroup>
                                    ))}
                                </div>
                            </InputOTP>

                            {fieldState.error && (
                                <div className="mt-2 text-center w-full">
                                    <FieldError errors={[fieldState.error]} />
                                </div>
                            )}
                        </Field>
                    )}
                />
            </FieldGroup>

            <div className="text-center text-slate-600 font-medium py-2">
                {canResend ? (
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={isResending}
                        className="text-gray-500 font-medium hover:underline transition-all disabled:opacity-50"
                    >
                        {isResending ? "Sending..." : "Resend Code"}
                    </button>
                ) : (
                    <span>You can request another code in: {timer}s</span>
                )}
            </div>

            {/* عرض أخطاء السيرفر (API Errors) */}
            {error && <ErrorAlert message={error.message} />}

            <Button
                type="submit"
                variant="ghost"
                disabled={isPending || !email || !form.formState.isValid}
                className="w-full h-10 bg-transparent hover:bg-slate-50 border-none shadow-none text-black font-medium transition-colors"
            >
                {isPending ? "Verifying..." : "Verify Code"}
            </Button>
        </form>
    );
}