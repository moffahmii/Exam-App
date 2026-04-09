'use client'
// استيراد الأيقونات الصحيحة من lucide-react
import { UserCircle, Lock, LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation';
import Link from 'next/link'; // تأكد من استيراد Link من next/link وليس lucide-react
import React from 'react'

export default function AccountSideBar() {
    const pathname = usePathname();
    const navLinks = [
        {
            href: '/account-setting', // تأكد من تغيير المسارات حسب مشروعك
            label: 'Profile',
            icon: UserCircle,
        },
        {
            href: '/change-password',
            label: 'Change Password',
            icon: Lock,
        },
    ];

    const getLinkClass = (path: string) => {
        const isActive = pathname === path;
        const baseClass = "flex items-center font-normal text-base gap-3 px-4 py-3 font-mono";

        if (isActive) {
            return `${baseClass} text-blue-600 bg-blue-50`;
        }
        return `${baseClass} text-gray-600 `;
    };

    return (
        <nav className="flex flex-col h-full p-6 bg-white">
            <div className="grow space-y-2">
                {navLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={getLinkClass(link.href)}
                        >
                            <Icon size={22} strokeWidth={1.5} />
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <div className="mt-auto pt-6 ">
                <button
                    onClick={() => {
                        console.log("Logging out...");
                    }}
                    className="flex w-full items-center font-normaltext-base gap-3 px-4 py-3 text-red-600 bg-red-50 font-mono"
                >
                    <LogOut size={22} strokeWidth={1.5} />
                    Logout
                </button>
            </div>
        </nav>
    )
}