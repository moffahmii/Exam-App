import React from 'react';
import { Controller, UseFormReturn } from "react-hook-form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ChangeEmailFormData } from '@/shared/schemas/auth-schema';

interface OtpStepProps {
    form: UseFormReturn<ChangeEmailFormData>;
    email: string;
    onEdit: () => void;
    timeLeft: number;
    onResend: () => void;
    isResending: boolean;
}

export function OtpStep({ form, email, onEdit, timeLeft, onResend, isResending }: OtpStepProps) {
    const { control, formState: { errors }, clearErrors } = form;

    return (
        <>
            <h4 className="text-2xl font-semibold text-blue-600 font-inter mb-2">Verify OTP</h4>
            <p className="text-base text-gray-500 font-mono text-left mb-4">
                Please enter the 6-digits code we have sent to:<br />
                <span className="text-slate-900 font-medium">{email}</span>
                <button type="button" onClick={onEdit} className="ml-2 text-blue-600 underline">
                    Edit
                </button>
            </p>

            <div className="mt-6 flex flex-col items-center gap-4">
                <Controller
                    control={control}
                    name="otp"
                    render={({ field }) => (
                        <InputOTP maxLength={6} {...field} onChange={(val) => { field.onChange(val); clearErrors("otp"); }}>
                            <InputOTPGroup className="gap-2">
                                {[...Array(6)].map((_, i) => (
                                    <InputOTPSlot
                                        key={i} index={i}
                                        className={`w-10 h-12 border-slate-200 font-mono text-lg ${errors.otp ? 'border-red-500 focus:ring-red-500' : ''
                                            }`}
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                    )}
                />
                {errors.otp && (
                    <p className="text-xs text-red-600 animate-in fade-in">{errors.otp.message}</p>
                )}

                <div className="h-6 mt-2">
                    {timeLeft > 0 ? (
                        <p className="text-xs text-slate-500 font-mono">
                            You can request another code in: <span className="font-bold text-slate-700">{timeLeft}s</span>
                        </p>
                    ) : (
                        <button
                            type="button"
                            onClick={onResend}
                            disabled={isResending}
                            className="text-xs font-bold font-mono text-blue-600 hover:text-blue-800 underline disabled:opacity-50"
                        >
                            {isResending ? "Sending..." : "Resend Code"}
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}