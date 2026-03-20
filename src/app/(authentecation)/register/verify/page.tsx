"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useCountdownTimer } from "../../hooks/use-countdown-timer";
import useOTPVerification from "../../hooks/use-otp-verification";

export default function VerifyOTPPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [mounted, setMounted] = useState(false);

    const { timer, canResend, resetTimer } = useCountdownTimer(60);
    const { mutate, isPending, error } = useOTPVerification();

    // حل مشكلة الـ Hydration Error
    useEffect(() => {
        const email = Cookies.get("user_email");
        if (email) setUserEmail(email);
        setMounted(true);
    }, []);

    const handleVerify = () => {
        if (otp.length === 6) {
            mutate({ email: userEmail, code: otp });
        }
    };

    // لو لسه مخلصش الـ Render الأول على الـ Client ميعرضش حاجة
    if (!mounted) return null;

    return (
        <div className="w-full max-w-md mx-auto space-y-10 pt-6">
            <header className="space-y-3">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                <p className="text-xl font-semibold text-blue-600">Verify OTP</p>
                <div className="text-sm text-slate-500 font-mono leading-relaxed pt-2">
                    Please enter the 6-digit code we have sent to: <br />
                    <span className="text-slate-900 font-medium">{userEmail || "your email"}</span>
                    <Button
                        variant="link"
                        className="text-blue-600 p-0 h-auto ml-2 text-sm font-medium"
                        onClick={() => router.push('/register')}
                    >
                        Edit
                    </Button>
                </div>
            </header>

            <div className="flex flex-col items-center space-y-6">
                <InputOTP maxLength={6} value={otp} onChange={setOtp} className="gap-0">
                    <div className="flex gap-2.5">
                        {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPGroup key={index}>
                                <InputOTPSlot
                                    index={index}
                                    className="w-12 h-14 text-xl font-medium border-slate-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                />
                            </InputOTPGroup>
                        ))}
                    </div>
                </InputOTP>

                <div className="text-sm text-slate-500 font-mono text-center">
                    {!canResend ? (
                        `You can request another code in: ${timer}s`
                    ) : (
                        <Button variant="ghost" className="text-blue-600 p-0 h-auto font-medium text-sm" onClick={resetTimer}>
                            Resend Code
                        </Button>
                    )}
                </div>

                {error && <p className="text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded">{(error as Error).message}</p>}
            </div>

            <div className="pt-6">
                <Button
                    className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 h-12 text-base font-semibold border border-blue-200 rounded-md shadow-sm transition-all"
                    disabled={otp.length !== 6 || isPending}
                    onClick={handleVerify}
                >
                    {isPending ? "Verifying..." : "Verify Code"}
                </Button>
            </div>
        </div>
    );
}