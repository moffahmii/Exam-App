"use client";

import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { SlidersHorizontal, X, Search, ChevronDown } from "lucide-react";

interface DiplomasFiltersProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    immutabilityFilter: string;
    setImmutabilityFilter: (val: string) => void;
}

export function DiplomasFilters({
    searchQuery,
    setSearchQuery,
    immutabilityFilter,
    setImmutabilityFilter
}: DiplomasFiltersProps) {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
        return (
            <div className="flex justify-end mb-6">
                <Button onClick={() => setIsVisible(true)} variant="outline" className="flex items-center gap-2 text-blue-600 border-blue-600 hover:bg-blue-50">
                    <SlidersHorizontal size={16} /> Show Search & Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="border border-gray-200 mb-6 bg-white">
            <div className="bg-blue-600 text-white flex justify-between items-center px-4 py-3">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal size={18} />
                    <span className="font-medium">Search & Filters</span>
                </div>
                <button onClick={() => setIsVisible(false)} className="flex items-center gap-1 text-sm hover:text-gray-200 focus:outline-none">
                    <X size={16} /> Hide
                </button>
            </div>

            <div className="p-4 flex flex-col gap-4">
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pr-10 focus-visible:ring-blue-600"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="relative w-full sm:w-[250px]">
                        {/* 🔥 ربط الـ Select بالـ State */}
                        <select
                            value={immutabilityFilter}
                            onChange={(e) => setImmutabilityFilter(e.target.value)}
                            className="w-full h-10 px-3 py-2 border border-gray-200 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none text-gray-600 cursor-pointer"
                        >
                            <option value="all">All Diplomas</option>
                            <option value="immutable">Immutable</option>
                            <option value="mutable">Mutable</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <Button
                            variant="ghost"
                            onClick={() => {
                                setSearchQuery("");
                                setImmutabilityFilter("all"); // 🔥 تصفير القائمة
                            }}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Clear
                        </Button>
                        <Button variant="secondary" className="bg-gray-200 text-gray-800 hover:bg-gray-300 min-w-[80px]">
                            Apply
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}