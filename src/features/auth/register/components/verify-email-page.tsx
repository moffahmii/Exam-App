"use client";

import React, { useState, useEffect } from "react";
import OTPForm from "./verify-otp-form";
import { Button } from "@/shared/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyOTPPage() {
    const [timeLeft, setTimeLeft] = useState(60);
    const [email, setEmail] = useState("");
    const router = useRouter();

    useEffect(() => {
        const savedEmail = Cookies.get("user_email");

        if (!savedEmail) {
            router.push("/register");
            return;
        }

        setEmail(savedEmail);
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <div className="flex flex-col w-full">
            <div className="mb-8 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800 font-inter">
                    Create Account
                </h1>
                <h2 className="text-2xl font-bold text-blue-600 font-inter">
                    Verify OTP
                </h2>
                <p className="text-gray-500 text-base  leading-relaxed">
                    Please enter the 6-digit code we have sent to:<br />
                    <span className="text-gray-800">{email}</span>{" "}
                    <Link href={"/register"} className="text-blue-600 underline ">
                        Edit
                    </Link>
                </p>
            </div>

            <div className="w-full ">
                <OTPForm email={email} />
            </div>
        </div>
    );
}