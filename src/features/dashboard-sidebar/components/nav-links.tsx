'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings } from "lucide-react";

export default function DashboardSidebarnavLinks() {
    const pathname = usePathname();
    const isDiplomasActive = pathname === "/" || pathname.startsWith("/dashboard");
    const isSettingsActive = pathname.startsWith("/account-setting");

    return (
        <nav className="p-6 space-y-2 bg-gray-800">
            {/* Diplomas */}
            <Link
                href="/dashboard/diplomas"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isDiplomasActive
                        ? "border border-gray-400 text-white bg-gray-400"
                        : "text-white"
                    }`}>
                <GraduationCap size={24} />
                Diplomas
            </Link>
            {/* Settings */}
            <Link
                href="/dashboard/exams"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isSettingsActive
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white"
                    }`}>
                <Settings size={24} />
                Exams
            </Link>
            <Link
                href="/dashboard/account-setting"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isSettingsActive
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white"
                    }`}>
                <Settings size={24} />
                Account Settings
            </Link>
            <Link
                href="/dashboard/audit-log"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isSettingsActive
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white"
                    }`}>
                <Settings size={24} />
                AUdit Log
            </Link>
        </nav>
    )
}