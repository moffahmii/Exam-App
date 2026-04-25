'use client';

import ForgotPasswordForm from "@/features/auth/components/forgotPasswordForm";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {

    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        await fetch("https://exam-app.elevate-bootcamp.cloud/api/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                password,
            }),
        });
    };

    return <ForgotPasswordForm onSent={handleSubmit} />
}