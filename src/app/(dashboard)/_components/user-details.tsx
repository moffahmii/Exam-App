"use client";
import React, { useEffect, useRef } from "react";
import { UserCircle, LogOut, MoreVertical, UserRound } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/lib/store/user-store";

export default function UserDropdown() {
    const { user, isDropdownOpen, toggleDropdown, closeDropdown, initializeUser, logout } = useUserStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        initializeUser();
    }, [initializeUser]);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);

    if (!user) return null;

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="w-full p-3 flex items-center gap-3  border-blue-100 "
            >
                <div className="relative">
                    <img
                        src={user.profilePhoto || ''}
                        className="w-13.5 h-13.5  border border-blue-600 object-cover"
                        alt="user"
                    />
                </div>
                <div className="flex-1 text-left overflow-hidden font-mono">
                    <p className="font-medium text-blue-600 text-base">
                        {user.firstName}
                    </p>
                    <p className="text-gray-500 text-sm font-normal">
                        {user.email}
                    </p>
                </div>
                <MoreVertical size={18} className="text-gray-400 shrink-0" />
            </button>
            {/* 2. القائمة (الدروب داون) - تظهر فوق التريجر */}
            {isDropdownOpen && (
                <div className="absolute bottom-[105%] left-4 right-4 bg-white  border-b border-gray-100 py-1 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <Link
                        href="/account-setting"
                        onClick={closeDropdown}
                        className="flex items-center gap-3 px-4 py-3 text-gray-800"
                    >
                        <UserRound size={20} className="text-gray-400" />
                        <span className="font-medium">Account</span>
                    </Link>
                    <div className="h-px bg-gray-100 my-1" />
                    <button
                        onClick={() => {
                            closeDropdown();
                            logout();
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[#E05656] hover:bg-red-50 transition-colors text-left"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}