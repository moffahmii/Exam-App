"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Loader2, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { ChangeEmailFormData, emailSchema } from "@/shared/schemas/auth-schema";
import { useChangeEmail } from "../hooks/use-change-email";

import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { Stepper } from "./ChnageEcmailStepper";

interface ChangeEmailModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangeEmailModal({ isOpen, onClose }: ChangeEmailModalProps) {
    const { update } = useSession();

    const {
        step,
        setStep,
        isLoading,
        timeLeft,
        handleRequest,
        handleVerify,
        reset,
        email,
    } = useChangeEmail();

    const [isResending, setIsResending] = useState(false);

    const form = useForm<ChangeEmailFormData>({
        resolver: zodResolver(emailSchema),
        defaultValues: { email: "", otp: "" },
    });

    const { getValues, trigger, setError, clearErrors, reset: resetForm } = form;

    // ---------------- CLOSE HANDLER ----------------
    const handleClose = () => {
        reset();
        resetForm();
        onClose();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };

        if (isOpen) window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    // ---------------- ACTIONS ----------------
    const onNext = async () => {
        const isEmailValid = await trigger("email");
        if (!isEmailValid) return;

        const emailValue = getValues("email");
        const result = await handleRequest(emailValue);

        if (!result.success) {
            setError("email", { type: "server", message: result.error });
        }
    };

    // ---------------- ACTIONS ----------------
    const onVerify = async () => {
        const isOtpValid = await trigger("otp");
        if (!isOtpValid) return;

        const { otp } = getValues();
        if (!otp) return;

        const result = await handleVerify(otp);

        if (result.success) {
            // 🔥 مسح الجلسة بشكل آمن من السيرفر وإجبار المستخدم على تسجيل الدخول
            await signOut({
                redirect: true,
                callbackUrl: "/login" // قم بتغييره إلى مسار صفحة الدخول الخاصة بك لو كان مختلفاً
            });

            // يمكنك إزالة handleClose() لأن الصفحة ستعمل Redirect بالكامل
        } else {
            setError("otp", { type: "server", message: result.error });
        }
    };

    const handleResendOtp = async () => {
        setIsResending(true);
        clearErrors("otp");

        const result = await handleRequest(email);
        setIsResending(false);

        if (!result.success) {
            setError("otp", { type: "server", message: result.error });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <div className="relative bg-white w-[549px] flex flex-col rounded-lg shadow-xl overflow-hidden">
                {/* CLOSE */}
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-900 transition-colors"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>

                <div className="flex-1 p-9 flex flex-col">
                    <Stepper step={step} />

                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        Change Email
                    </h2>

                    {step === 1 ? (
                        <EmailStep form={form} />
                    ) : (
                        <OtpStep
                            form={form}
                            email={email}
                            onEdit={() => {
                                setStep(1);
                                clearErrors();
                            }}
                            timeLeft={timeLeft}
                            onResend={handleResendOtp}
                            isResending={isResending}
                        />
                    )}
                </div>

                {/* ACTION BUTTON */}
                <div className="p-6 bg-gray-50 border-t">
                    <Button
                        disabled={isLoading || isResending}
                        className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2 transition-colors"
                        onClick={step === 1 ? onNext : onVerify}
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : step === 1 ? (
                            <>
                                Next <ChevronRight size={18} />
                            </>
                        ) : (
                            "Verify Code"
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}