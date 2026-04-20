"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";

interface ExamsFiltersProps {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
    durationFilter: string;
    setDurationFilter: (val: string) => void;
}

export function ExamsFilters({
    searchQuery,
    setSearchQuery,
    durationFilter,
    setDurationFilter,
}: ExamsFiltersProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return (
            <div className="flex justify-end mb-6">
                <Button
                    onClick={() => setIsVisible(true)}
                    variant="outline"
                    className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                >
                    <SlidersHorizontal size={16} /> Show Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 mb-6 bg-white">
            <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} />
                    <span>Search & Filters</span>
                </div>
                <button onClick={() => setIsVisible(false)}>
                    <X size={16} />
                </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
                {/* Search */}
                <div className="relative">
                    <Input
                        placeholder="Search exam..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                {/* Filter */}
                <div className="flex justify-between items-center gap-4">
                    <div className="relative w-[200px]">
                        <select
                            value={durationFilter}
                            onChange={(e) => setDurationFilter(e.target.value)}
                            className="w-full h-10 px-3 border rounded-md"
                        >
                            <option value="all">All Durations</option>
                            <option value="short">{"< 30 min"}</option>
                            <option value="medium">30 - 60 min</option>
                            <option value="long">{"> 60 min"}</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>

                    <Button
                        variant="ghost"
                        onClick={() => {
                            setSearchQuery("");
                            setDurationFilter("all");
                        }}
                    >
                        Clear
                    </Button>
                </div>
            </div>
        </div>
    );
}