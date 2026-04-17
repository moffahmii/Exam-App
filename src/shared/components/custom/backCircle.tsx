import React from "react";

interface BackgroundCircleProps {
    className?: string;
    size?: string;
}

export function BackCircle({
    className = "",
    size = "w-[300px] h-[300px]",
}: BackgroundCircleProps) {
    return (
        <div
            className={`absolute rounded-full bg-blue-400 blur-3xl opacity-40 ${size} ${className}`}
        />
    );
}