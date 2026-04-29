'use client'
import React from 'react'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, Settings, ClipboardList, History } from "lucide-react";

const NAV_LINKS = [
    {
        label: "Diplomas",
        href: "/dashboard/diplomas",
        icon: GraduationCap,
    },
    {
        label: "Exams",
        href: "/dashboard/exams",
        icon: ClipboardList,
    },
    {
        label: "Account Settings",
        href: "/dashboard/account-setting",
        icon: Settings,
    },
    {
        label: "Audit Log",
        href: "/dashboard/audit-logs",
        icon: History,
    },
];

export default function DashboardSidebarnavLinks() {
    const pathname = usePathname();
    const isActive = (path: string) => pathname.startsWith(path);

    return (
        <nav className="p-6 space-y-2 bg-gray-800 h-full">

            {/* 2. عملنا Map لتقليل التكرار وبناء اللينكات ديناميكياً */}
            {NAV_LINKS.map((link) => {
                const active = isActive(link.href);
                const Icon = link.icon; // بنخزن الأيقونة في متغير بحرف كابيتال عشان React يقراها كمكون

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center font-normal text-base gap-3 p-4 transition-colors border
                            ${active
                                ? "border-gray-400 text-white bg-gray-600/40"
                                : "border-transparent text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                    >
                        <Icon size={24} />
                        {link.label}
                    </Link>
                );
            })}

        </nav>
    );
}