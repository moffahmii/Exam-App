"use client";

import React, { useState, useEffect } from "react";

interface CircularTimerProps {
    initialMinutes: number;
    onTimeUp?: () => void;
}

export default function CircularTimer({ initialMinutes, onTimeUp }: CircularTimerProps) {
    const totalSeconds = initialMinutes * 60;
    const [timeLeft, setTimeLeft] = useState(totalSeconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            if (onTimeUp) onTimeUp();
            return;
        }
        const timerId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp]);

    const radius = 38; // نصف قطر الدائرة
    const circumference = 2 * Math.PI * radius; // محيط الدائرة بالكامل
    const percentage = timeLeft / totalSeconds;
    const strokeDashoffset = circumference - percentage * circumference;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
        <div className="relative flex items-center justify-center w-20 h-20 font-mono">
            {/* SVG Container */}
            <svg
                className="w-full h-full transform -rotate-90"
                viewBox="0 0 100 100"
            >
                {/* الدائرة الخلفية الرمادية الفاتحة */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-gray-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                />
                {/* الدائرة الزرقاء (Progress) */}
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    className="text-blue-600 transition-all duration-1000 ease-linear"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </svg>

            {/* النص في المنتصف */}
            <div className="absolute flex flex-col items-center justify-center text-sm font-bold font-mono text-gray-800">
                {formattedTime}
            </div>
        </div>
    );
}