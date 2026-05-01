"use client";

import { useRouter } from "next/navigation";
import { RotateCcw, FolderSearch } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

export function ResultsActions() {
    const router = useRouter();

    // Navigate back to the previous view to restart the flow
    const handleRestart = () => {
        router.back();
    };

    // Navigate to the main directory
    const handleExplore = () => {
        router.push("/diplomas");
    };

    return (
        <div className="flex justify-between items-center pt-8 gap-6">
            <Button
                type="button"
                variant="outline"
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center px-6 py-3 text-gray-500 font-medium text-sm bg-gray-100 hover:bg-gray-200 transition-colors border-none rounded-none h-auto cursor-pointer"
            >
                <RotateCcw className="mr-2 w-5 h-5" />
                Restart
            </Button>

            <Button
                type="button"
                onClick={handleExplore}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors border-none rounded-none h-auto cursor-pointer"
            >
                <FolderSearch className="mr-2 w-5 h-5" />
                Explore
            </Button>
        </div>
    );
}