"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, FolderSearch } from "lucide-react";

export function ResultsActions() {
    const router = useRouter();

    const handleRestart = () => {
        // بيرجع المستخدم خطوة للوراء في الهيستوري (لصفحة الامتحان)
        router.back();
    };

    const handleExplore = () => {
        // بيوجه المستخدم لصفحة الدبلومات
        router.push('/diplomas');
    };

    return (
        <div className="flex justify-between items-center pt-8 gap-6">
            <button
                type="button"
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center px-6 py-3 text-gray-500 font-medium text-sm bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            >
                <RotateCcw className="mr-2 w-5 h-5" /> Restart
            </button>

            <button
                type="button"
                onClick={handleExplore}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm cursor-pointer font-medium transition-colors"
            >
                <FolderSearch className="mr-2 w-5 h-5" /> Explore
            </button>
        </div>
    );
}