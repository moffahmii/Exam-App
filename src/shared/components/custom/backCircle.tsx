import React from "react";

interface BackgroundCircleProps {
    className?: string;
    size?: number | string; // يقبل رقم أو نص
}

export function BackCircle({
    className = "",
    size = 300, // المقاس الافتراضي
}: BackgroundCircleProps) {
    return (
        <div
            style={{ width: size, height: size }} // الحل القاطع هنا
            className={`absolute rounded-full bg-blue-400 blur-3xl opacity-40 shrink-0 ${className}`}
        />
    );
}