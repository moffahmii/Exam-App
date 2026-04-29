"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, LayoutDashboard, LogOut, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function UserDropdown() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!session?.user) return null;
    const user = session.user;
    const isAdmin = user?.role == "ADMIN"

    return (
        <div className="relative w-70.5 h-13.5 mx-auto my-4 px-4 " ref={dropdownRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute bottom-full left-4  right-4 mb-2 bg-white border border-gray-100 z-50 overflow-hidden"
                    >
                        <div className="flex flex-col">
                            {/* Account Link */}
                            <Link
                                href="/account-setting"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 h-12.5 p-2 border-b border-gray-100"
                            >
                                <User size={18} className="text-gray-400" />
                                <span className="text-sm">Account</span>
                            </Link>
                            {/* Dashboard Link */}
                            {isAdmin && <Link
                                href="/dashboard"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 h-12.5 p-2 border-b border-gray-100 "
                            >
                                <LayoutDashboard size={18} className="text-gray-400" />
                                <span className="text-sm">Dashboard</span>
                            </Link>}
                            {/* Logout Button */}
                            <button
                                onClick={() => signOut({ callbackUrl: "/login" })}
                                className="flex items-center gap-4 h-12.5 p-2 text-sm hover:bg-red-50 text-[#ef4444] transition-colors text-left"
                            >
                                <LogOut size={18} className="rotate-180" />
                                <span className="text-sm">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 p-2 cursor-pointer group"
            >
                {/* Profile Image with Blue Border */}
                <div className="relative w-12 h-12 border-2 border-blue-600 p-0.5">
                    <div className="relative w-full h-full">
                        <Image
                            src={user.profilePhoto || "/profile.png"}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
                {/* User Info */}
                <div className="flex-1 overflow-hidden">
                    <h3 className="text-base font-medium text-blue-600">
                        {user.firstName || "Firstname"}
                    </h3>
                    <p className="text-gray-500 text-sm truncate font-mono">
                        {user.email || "user-email@example.com"}
                    </p>
                </div>
                {/* Three Dots Icon */}
                <MoreVertical className="text-gray-400 group-hover:text-gray-600" size={20} />
            </div>
        </div>
    );
}