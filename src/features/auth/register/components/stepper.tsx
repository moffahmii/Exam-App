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

    const RenderLine = ({ index }: { index: number }) => (
        <div className="flex-1 mx-2 relative h-0.5">
            <div
                className="absolute inset-0 h-full w-full"
                style={{
                    backgroundImage: `linear-gradient(to right, #94a3b8 50%, transparent 50%)`,
                    backgroundSize: '10px 2px',
                    backgroundRepeat: 'repeat-x',
                    opacity: 0.3
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

    return (
        <div className="flex items-center w-full px-1 py-4">
            <RenderDiamond index={1} />
            <RenderLine index={1} />
            <RenderDiamond index={2} />
            <RenderLine index={2} />
            <RenderDiamond index={3} />
            <RenderLine index={3} />
            <RenderDiamond index={4} />
        </div>
    );
}