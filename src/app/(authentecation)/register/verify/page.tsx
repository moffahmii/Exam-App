"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot, } from "@/components/ui/input-otp";
import { useCountdownTimer } from "../../hooks/use-countdown-timer";
import useOTPVerification from "../../hooks/use-otp-verification";
import useEmailVerification from "../../hooks/use-verify-email";
import { Loader2 } from "lucide-react";

export default function VerifyOTPPage() {
    const router = useRouter();

    const [otp, setOtp] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [mounted, setMounted] = useState(false);

    const { timer, canResend, resetTimer } = useCountdownTimer(60);

    const { mutate: verifyOTP, isPending, error, } = useOTPVerification();

    const {
        mutate: sendEmail,
        isPending: isResending,
        error: resendError,
    } = useEmailVerification();

    useEffect(() => {
        const email = Cookies.get("user_email");
        if (email) setUserEmail(email);
        setMounted(true);
    }, []);

    const handleVerify = () => {
        if (otp.length === 6) {
            verifyOTP({ email: userEmail, code: otp });
        }
    };

    const handleResend = () => {
        if (!userEmail) return;
        sendEmail(userEmail, {
            onSuccess: () => {
                resetTimer();
                setOtp("");
            },
        });
    };

    if (!mounted) return null;

    return (
        <div className="w-full max-w-md mx-auto space-y-10">
            {/* Header */}
            <header className="space-y-3">
                <h1 className="text-3xl font-bold text-gray-800 font-inter tracking-tight">
                    Create Account
                </h1>

                <p className="text-2xl font-bold text-blue-700 font-inter">
                    Verify OTP
                </p>

                <div className="text-base text-gray-500 font-mono leading-relaxed pt-2">
                    Please enter the 6-digit code we have sent to:
                    <br />
                    <span className="text-gray-800 font-medium">
                        {userEmail || "your email"}
                    </span>

                    <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto ml-2 text-sm font-medium"
                        onClick={() => router.push("/register")}
                    >
                        Edit
                    </Button>
                </div>
            </header>

            {/* OTP INPUT */}
            <div className="flex flex-col items-center space-y-6">
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className="gap-0"
                >
                    <div className="flex gap-2.5">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPGroup key={index}>
                                <InputOTPSlot
                                    index={index}
                                    className="w-10 h-10 text-base font-medium border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-600"
                                />
                            </InputOTPGroup>
                        ))}
                    </div>
                </InputOTP>

                {/* TIMER / RESEND */}
                <div className="text-sm text-slate-500 font-mono text-center">
                    {!canResend ? (
                        `You can request another code in: ${timer}s`
                    ) : (
                        <Button
                            variant="ghost"
                            className="text-blue-600 p-0 h-auto font-medium text-sm"
                            onClick={handleResend}
                            disabled={isResending}
                        >
                            {isResending ? "Sending..." : "Resend Code"}
                        </Button>
                    )}
                </div>

                {/* ERRORS */}
                {(error || resendError) && (
                    <p className="text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded">
                        {(error || resendError)?.message}
                    </p>
                )}
            </div>

            {/* VERIFY BUTTON */}
            <div className="pt-6 flex justify-center">
                <Button
                    type="submit"
                    onClick={handleVerify}
                    disabled={otp.length !== 6 || isPending}
                    className="bg-transparent hover:bg-transparent text-gray-800 font-mono text-sm font-medium p-0 h-auto disabled:opacity-100 disabled:bg-transparent"
                >
                    {isPending ? (
                        <Loader2 className="animate-spin size-5 text-blue-600" />
                    ) : (
                        "Verify Code"
                    )}
                </Button>
            </div>
        </div>
    );
}