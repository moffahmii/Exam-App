"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/shared/components/ui/button";
import { ChevronRight, Loader2, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangeEmail } from '../_hooks/use-change-email';
import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { ChangeEmailFormData, emailSchema } from '@/shared/schemas/auth-schema';
import { Stepper } from './ChnageEcmailStepper';

interface ChangeEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangeEmailModal({ isOpen, onClose }: ChangeEmailModalProps) {
    const { update } = useSession();
    const { step, setStep, isLoading, timeLeft, handleRequest, handleVerify, reset } = useChangeEmail();
    const [isResending, setIsResending] = useState(false);

    const form = useForm<ChangeEmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: '', otp: '' }
    });

    const { getValues, trigger, setError, clearErrors, reset: resetForm } = form;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        if (isOpen) window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen]);

    const onNext = async () => {
        const isEmailValid = await trigger("email");
        if (!isEmailValid) return;

        const email = getValues("email");
        const result = await handleRequest(email);

        if (!result.success) {
            setError("email", { type: "server", message: result.error || "Something went wrong" });
        }
    };

    const onVerify = async () => {
        const isOtpValid = await trigger("otp");
        if (!isOtpValid) return;

        const { email, otp } = getValues();
        if (!otp) return;

        const result = await handleVerify(otp);
        if (result.success) {
            await update({ user: { email } });
            handleClose();
        } else {
            setError("otp", { type: "server", message: result.error || "Invalid OTP code" });
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        clearErrors("otp");
        const email = getValues("email");
        const result = await handleRequest(email);
        setIsResending(false);

        if (!result.success) {
            setError("otp", { type: "server", message: result.error || "Failed to resend code" });
        }
    };

    const handleClose = () => {
        reset();
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
            <div className="relative bg-white w-[549px] flex flex-col animate-in zoom-in-95 duration-200">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X size={24} />
                </button>
                <div className="flex-1 p-9 flex flex-col ">
                    <Stepper step={step} />
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight mb-4 font-inter">Change Email</h2>
                    {step === 1 ? (
                        <EmailStep form={form} />
                    ) : (
                        <OtpStep
                            form={form}
                            email={getValues("email")}
                            onEdit={() => { setStep(1); clearErrors(); }}
                            timeLeft={timeLeft}
                            onResend={handleResendOtp}
                            isResending={isResending}
                        />
                    )}
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <Button
                        disabled={isLoading || isResending}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 text-lg font-medium rounded-none"
                        onClick={step === 1 ? onNext : onVerify}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : step === 1 ? (
                            <>Next <ChevronRight size={18} strokeWidth={3} /></>
                        ) : (
                            "Verify Code"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}