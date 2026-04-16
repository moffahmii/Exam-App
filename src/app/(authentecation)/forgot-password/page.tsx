"use client"
import { useState } from "react"
import Link from "next/link"
import ForgotPasswordForm from "./forgotPasswordForm"
import PasswordRsestSent from "../_components/password-reset-sent";
import { ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false)
    const [email, setEmail] = useState("")

    const handleSuccess = (userEmail: string) => {
        setEmail(userEmail)
        setIsSent(true)
    }

    // حالة النجاح بعد إرسال الإيميل
    if (isSent) {
        return (
            <div className="animate-in fade-in zoom-in-95 duration-500">
                <PasswordRsestSent email={email} />
            </div>
        )
    }

    return (
        <div className="w-full max-w-lg space-y-8 px-4 font-mono animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="space-y-2">
                <Link 
                    href="/login" 
                    className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-6 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>
                
                <h1 className="text-3xl font-bold text-gray-800 font-inter tracking-tight">
                    Forgot Password?
                </h1>
                <p className="font-normal text-gray-500 text-base leading-relaxed">
                    Don’t worry, enter your email and we will help you recover your account.
                </p>
            </div>

            {/* Form Component */}
            <div className="bg-white">
                <ForgotPasswordForm onSent={handleSuccess} />
            </div>

            {/* Footer */}
            <div className="pt-4">
                <p className="text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/register" className="font-medium text-blue-600 hover:underline underline-offset-4">
                        Create yours
                    </Link>
                </p>
            </div>
        </div>
    )
}