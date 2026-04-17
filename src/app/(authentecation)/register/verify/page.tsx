"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useCountdownTimer } from "@/features/auth/hooks/use-countdown-timer";
import { OTPFormValues, otpSchema } from "@/shared/schemas/auth-schema";
import useOTPVerification from "@/features/auth/hooks/use-otp-verification";
import useEmailVerification from "@/features/auth/hooks/use-verify-email";
import { Button } from "@/shared/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/shared/components/ui/input-otp";

export default function VerifyOTPPage() {
    const router = useRouter();
    const [userEmail, setUserEmail] = useState("");
    const [mounted, setMounted] = useState(false);
    const { timer, canResend, resetTimer } = useCountdownTimer(60);
    const { mutate: verifyOTP, isPending, error } = useOTPVerification();
    const { mutate: sendEmail, isPending: isResending, error: resendError } = useEmailVerification();
    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid }
    } = useForm<OTPFormValues>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp: "",
        },
        mode: "onChange", 
    });

    const currentOtp = watch("otp");

    useEffect(() => {
        const email = Cookies.get("user_email");
        if (email) setUserEmail(email);
        setMounted(true);
    }, []);
    const onSubmit = (data: OTPFormValues) => {
        verifyOTP({ email: userEmail, code: data.otp });
    };

    const handleResend = () => {
        if (!userEmail) return;
        sendEmail(userEmail, {
            onSuccess: () => {
                resetTimer();
                setValue("otp", ""); 
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

                <div className="text-base text-gray-500  leading-relaxed pt-2">
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

            {/* تم تحويل الـ div لـ form */}
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center space-y-6">

                {/* استخدام Controller لربط InputOTP بالـ Form */}
                <div className="flex flex-col items-center space-y-2">
                    <Controller
                        control={control}
                        name="otp"
                        render={({ field }) => (
                            <InputOTP
                                maxLength={6}
                                value={field.value} // ربط القيمة
                                onChange={field.onChange} // ربط التغيير
                                className="gap-0"
                            >
                                <div className="flex gap-2.5">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <InputOTPGroup key={index}>
                                            <InputOTPSlot
                                                index={index}
                                                className={`w-10 h-10 text-base font-medium border-gray-200 text-gray-800 focus:ring-2 focus:ring-blue-600 ${errors.otp ? "border-red-500 focus:ring-red-500" : ""
                                                    }`}
                                            />
                                        </InputOTPGroup>
                                    ))}
                                </div>
                            </InputOTP>
                        )}
                    />
                    {errors.otp && (
                        <p className="text-sm text-red-500 font-medium">{errors.otp.message}</p>
                    )}
                </div>

                {/* TIMER / RESEND */}
                <div className="text-sm text-slate-500 font-mono text-center">
                    {!canResend ? (
                        `You can request another code in: ${timer}s`
                    ) : (
                        <Button
                            type="button" 
                            variant="ghost"
                            className="text-blue-600 p-0 h-auto font-medium text-sm"
                            onClick={handleResend}
                            disabled={isResending}
                        >
                            {isResending ? "Sending..." : "Resend Code"}
                        </Button>
                    )}
                </div>

                {/* ERRORS من الـ API */}
                {(error || resendError) && (
                    <p className="text-red-500 text-xs font-medium bg-red-50 px-3 py-1 rounded w-full text-center">
                        {(error || resendError)?.message}
                    </p>
                )}

                {/* VERIFY BUTTON */}
                <div className="pt-6 flex justify-center w-full">
                    <Button
                        type="submit"
                        disabled={!isValid || currentOtp.length !== 6 || isPending}
                        className="bg-transparent hover:bg-transparent text-gray-800 font-mono text-sm font-medium p-0 h-auto disabled:opacity-100 disabled:bg-transparent"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin size-5 text-blue-600" />
                        ) : (
                            "Verify Code"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}