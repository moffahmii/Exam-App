"use client";
import { useEffect, useState, useCallback } from "react";

type Props = {
    duration: number;
    onTimeEnd: () => void;
};

export default function ExamTimer({ duration, onTimeEnd }: Props) {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeEnd();
            return;
        }
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, onTimeEnd]);

    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const progress = (timeLeft / duration) * circumference;

    const formatTime = (time: number) => {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        return `${min}:${sec.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center gap-4">
            <span className="text-xl font-black text-gray-800 tabular-nums">
                {formatTime(timeLeft)}
            </span>
            <div className="relative w-12 h-12">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="24" cy="24" r={radius}
                        stroke="#F1F5F9" strokeWidth="4" fill="none"
                    />
                    <circle
                        cx="24" cy="24" r={radius}
                        stroke={timeLeft < 60 ? "#EF4444" : "#2563EB"}
                        strokeWidth="4" fill="none"
                        strokeDasharray={circumference}
                        style={{
                            strokeDashoffset: circumference - progress,
                            transition: "stroke-dashoffset 1s linear, stroke 0.3s"
                        }}
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        </div>
    );
}