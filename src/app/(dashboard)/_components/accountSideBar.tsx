'use client'
import { GraduationCap, Link, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation';
import React from 'react'

export default function AccountSideBar() {
    const pathname = usePathname();
    const isDiplomasActive = pathname === "/account-setting";
    const isSettingsActive = pathname === "/change-password";
    return (

        <div className=" h-screen">
            <nav className="p-4 space-y-2 font-mono flex flex-col justify-between h-full bg-white">
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
                    Account Setting
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
        </div>
    )
}
