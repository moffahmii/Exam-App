"use client";
import React, { useEffect, useRef } from "react";
import { LogOut, MoreVertical, UserRound } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useUIStore } from "@/lib/store/user-store";
import { IUser } from "@/lib/types/user";

export default function UserDropdown() {
    const { data: session, status } = useSession();
    const { isDropdownOpen, toggleDropdown, closeDropdown } = useUIStore();
    const dropdownRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeDropdown]);
    if (status === "loading" || !session?.user) return null;
    const user = session.user as IUser;
    
    // const getProfileImage = (path?: string) => {
    //     if (!path) return "/default-profile.png";
    //     if (path.startsWith("http")) return path;
    //     return `https://exam-app.elevate-bootcamp.cloud${path}`;
    // };

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className="w-full p-3 flex items-center gap-3 border-blue-100 hover:bg-gray-50 transition-colors rounded-lg"
            >
                <div className="relative shrink-0">
                    {/* <img
                        src={ "/default-profile.png"}
                        className="w-12 h-12 border border-blue-600 object-cover "
                        alt="user profile"
                    /> */}
                </div>
                <div className="flex-1 text-left overflow-hidden font-mono">
                    <p className="font-medium text-blue-600 text-base truncate">
                        {user.firstName || user.name || "User"}
                    </p>
                    <p className="text-gray-500 text-sm font-normal truncate">
                        {user.email}
                    </p>
                </div>
                <MoreVertical size={18} className="text-gray-400 shrink-0" />
            </button>
            {isDropdownOpen && (
                <div className="absolute bottom-[105%] left-4 right-4 bg-white border border-gray-100  py-2 z-50 ">
                    <Link
                        href="/account-setting"
                        onClick={closeDropdown}
                        className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors"
                    >
                        <UserRound size={20} className="text-gray-400" />
                        <span className="font-medium">Account Settings</span>
                    </Link>
                    <div className="h-px bg-gray-100 my-1 mx-2" />
                    <button
                        onClick={async () => {
                            closeDropdown();
                            await signOut({ callbackUrl: "/login" });
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