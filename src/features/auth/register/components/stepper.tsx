"use client";

import React from 'react';
import { usePathname } from "next/navigation";
import { cn } from '@/shared/utils/cn.util';

export function Stepper() {
    const pathname = usePathname();

    const getStep = () => {
        if (pathname === "/register") return 1;
        if (pathname === "/register/verify") return 2;
        if (pathname === "/register/complete") return 3;
        if (pathname === "/register/password") return 4;
        return 1;
    };

    const step = getStep();

    const renderLine = (index: number) => (
        <div className="flex-1 relative h-[2px] self-center">
            <div
                className="absolute inset-0 w-full h-full"
                style={{
                    backgroundImage: `linear-gradient(to right, #3b82f6 50%, transparent 50%)`,
                    backgroundSize: '8px 2px',
                    backgroundRepeat: 'repeat-x',
                    opacity: 0.4
                }}
            />
            <div
                className={cn(
                    "absolute inset-0 h-full bg-blue-600 transition-all duration-700 ease-in-out origin-left",
                    step > index ? "scale-x-100" : "scale-x-0"
                )}
            />
        </div>
    );

    const RenderDiamond = ({ index }: { index: number }) => {
        const isActive = step === index;
        const isCompleted = step > index;
        return (
            <div className="relative flex items-center justify-center">
                <div className={cn(
                    "w-3 h-3 rotate-45 transition-all duration-500 z-10",
                    isCompleted || isActive
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-2 border-slate-300",
                    isActive && "ring-[6px] ring-blue-50 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                )} />
            </div>
        );
    };

    const renderDiamond = (index: number) => (
        <RenderDiamond index={index} />
    );

    return (
        <div className="flex items-center w-full max-w-md mx-auto px-4 py-8">
            {renderDiamond(1)}
            {renderLine(1)}
            {renderDiamond(2)}
            {renderLine(2)}
            {renderDiamond(3)}
            {renderLine(3)}
            {renderDiamond(4)}
        </div>
    );
}