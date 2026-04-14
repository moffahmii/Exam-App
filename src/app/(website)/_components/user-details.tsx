"use client";

import React, { useState, useEffect, useRef } from "react";
import { LogOut, User, ChevronUp, Settings } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function UserDropdown() {
    const { data: session, status } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // إغلاق القائمة عند الضغط خارجها
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // لو لسه بيعمل Load أو مفيش يوزر، ميعرضش حاجة
    if (status === "loading" || !session?.user) return null;

    const user = session.user;

    return (
        <div className="relative w-full px-4" ref={dropdownRef}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute bottom-full left-4 right-4 mb-3 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50"
                    >
                        <div className="py-2">
                            <Link
                                href="/account-setting"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all group"
                            >
                                <div className="p-2 rounded-lg bg-gray-50 group-hover:bg-blue-100 transition-colors">
                                    <User size={18} />
                                </div>
                                <span className="font-medium text-sm">Account Settings</span>
                            </Link>

                            <div className="h-px bg-gray-100 mx-4 my-1" />

                            <button
                                onClick={async () => {
                                    setIsOpen(false);
                                    await signOut({ callbackUrl: "/login" });
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 transition-all group"
                            >
                                <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                                    <LogOut size={18} />
                                </div>
                                <span className="font-medium text-sm">Logout</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* الزر الرئيسي */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full p-2.5 flex items-center gap-3 rounded-xl transition-all duration-200 border ${isOpen
                        ? "border-blue-200 bg-blue-50/50 shadow-sm"
                        : "border-transparent hover:bg-gray-100"
                    }`}
            >
                <div className="relative h-10 w-10 shrink-0">
                    <Image
                        src={user.profilePhoto || "/default-profile.png"}
                        alt="Profile"
                        fill
                        className="rounded-lg object-cover border border-gray-200"
                    />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>

                <div className="flex-1 text-left overflow-hidden">
                    <p className="font-bold text-gray-900 text-sm truncate uppercase tracking-tight">
                        {user.firstName || "Student"}
                    </p>
                    <p className="text-gray-500 text-xs truncate font-medium">
                        {user.email}
                    </p>
                </div>

                <ChevronUp
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>
        </div>
    );
}