'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings } from "lucide-react";

export default function SidebarnavLinks() {
    const pathname = usePathname();
    const isDiplomasActive = pathname === "/" || pathname === "/diplomas/**";
    const isSettingsActive = pathname === "/account-setting";
    return (
        <nav className=" p-6 space-y-2 font-mono">
            {/* Diplomas */}
            <Link
                href="/"
                className={`flex items-center font-medium text-base gap-3 px-4 py-3
                        ${isDiplomasActive
                        ? "border border-blue-500 text-blue-500 bg-blue-100"
                        : "text-gray-500 "
                    }
                            `}
            >
                <GraduationCap size={24} />
                Diplomas
            </Link>
            {/* Settings */}
            <Link
                href="/account-setting"
                className={`flex items-center font-medium text-base gap-3 px-4 py-3
                            ${isSettingsActive
                        ? "border border-blue-500 text-blue-600 bg-blue-50"
                        : "text-gray-500 "
                    }`}
            >
                <Settings size={24} />
                Account Settings
            </Link>
        </nav>
    )
}
