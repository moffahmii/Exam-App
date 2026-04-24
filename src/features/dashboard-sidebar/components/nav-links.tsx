'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings, ClipboardList, History } from "lucide-react";

export default function DashboardSidebarnavLinks() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <nav className="p-6 space-y-2 bg-gray-800">

            <Link
                href="/dashboard/diplomas"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isActive("/dashboard/diplomas")
                        ? "border border-gray-400 text-white bg-green-700"
                        : "text-white hover:bg-gray-700"
                    }`}>
                <GraduationCap size={24} />
                Diplomas
            </Link>

            <Link
                href="/dashboard/exams"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isActive("/dashboard/exams")
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white hover:bg-gray-700"
                    }`}>
                <ClipboardList size={24} />
                Exams
            </Link>

            {/* Account Settings */}
            <Link
                href="/dashboard/account-setting"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isActive("/dashboard/account-setting")
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white hover:bg-gray-700"
                    }`}>
                <Settings size={24} />
                Account Settings
            </Link>

            {/* Audit Log */}
            <Link
                href="/dashboard/audit-log"
                className={`flex items-center font-normal text-base gap-3 p-4 transition-colors
                    ${isActive("/dashboard/audit-logs")
                        ? "border border-gray-400 text-white bg-gray-700"
                        : "text-white hover:bg-gray-700"
                    }`}>
                <History size={24} />
                Audit Log
            </Link>
        </nav>
    )
}