"use client";
import React from "react";
import { GraduationCap } from "lucide-react";
import { useUserStore } from "@/lib/store/user-store";

export default function PageHeader() {
    const { headerTitle } = useUserStore();

    return (
        <div className="space-y-4 mb-6">
            <div className="flex items-center text-xs font-mono text-gray-400 lowercase tracking-widest">
                <span>home</span>
                <span className="mx-2">/</span>
                <span className="text-blue-500 font-bold">{headerTitle}</span>
            </div>
            <div className="bg-[#1762EF] rounded-xl p-6 flex items-center gap-5 text-white shadow-lg transition-all duration-300">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                    <GraduationCap size={32} strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl font-black tracking-tight uppercase italic">
                    {headerTitle}
                </h1>
            </div>
        </div>
    );
}