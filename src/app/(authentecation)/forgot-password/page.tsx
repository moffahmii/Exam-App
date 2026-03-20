"use client" // تأكد إنها موجودة
import { useState } from "react"
import Link from "next/link"
import ForgotPasswordForm from "./forgotPasswordForm"
import PasswordRsestSent from "../_components/password-reset-sent";

export default function ForgotPassword() {
    const [isSent, setIsSent] = useState(false)
    const [email, setEmail] = useState("")
    const handleSuccess = (userEmail: string) => {
        setEmail(userEmail)
        setIsSent(true)
    }
    if (isSent) {
        return <PasswordRsestSent email={email} />
    }

    return (
        <div className="w-full max-w-lg space-y-8 px-4 font-mono">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Forgot Password ?
                </h1>
                <p className="font-normal text-gray-500">
                    Don’t worry, we will help you recover your account
                </p>
            </div>
            <ForgotPasswordForm onSent={handleSuccess} />
            <p className="text-center text-sm text-slate-600 font-mono">
                Don't have an account?{" "}
                <Link href="/register" className="font-medium text-blue-600">
                    Create yours
                </Link>
            </p>
        </div>
    )
}