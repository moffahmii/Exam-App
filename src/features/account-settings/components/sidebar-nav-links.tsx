'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings } from "lucide-react";

export default function SidebarnavLinks() {
    const pathname = usePathname();
        const isDiplomasActive = pathname === "/" || pathname.startsWith("/diplomas");
        const isSettingsActive = pathname.startsWith("/account-setting");

    return (
        <nav className="p-6 space-y-2 font-mono">
            {/* Diplomas */}
            <Link
                href="/"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isDiplomasActive
                        ? "border border-blue-500 text-blue-600 bg-blue-100"
                        : "text-gray-500"
                    }`}>
                <GraduationCap size={24} />
                Diplomas
            </Link>
            {/* Settings */}
            <Link
                href="/account-setting"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isSettingsActive
                        ? "border border-blue-500 text-blue-600 bg-blue-100"
                        : "text-gray-500"
                    }`}>
                <Settings size={24} />
                Account Settings
            </Link>
        </nav>
    )
}