"use client";

import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-from";


export default function ForgotPasswordPage() {
    return (
        <div className="w-full max-w-lg space-y-8">

            {/* HEADER */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-800">
                    Forgot Password?
                </h1>

                <p className="text-gray-500">
                    Don’t worry, we will help you recover your account
                </p>
            </div>

            {/* FORM */}
            <ForgotPasswordForm />  

            {/* FOOTER */}
            <p className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link
                    href="/register"
                    className="text-blue-600 font-medium"
                >
                    Create yours
                </Link>
            </p>
        </div>
    );
}