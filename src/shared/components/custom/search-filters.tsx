"use client";

import React, { useState } from "react";
import { SlidersHorizontal, ChevronUp, ChevronDown, Search, ChevronsUpDown } from "lucide-react";

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterDropdownConfig {
    value: string;
    onChange: (val: string) => void;
    placeholder?: string;
    options: FilterOption[];
    disabled?: boolean;
}

interface GlobalFiltersProps {
    showSearch?: boolean;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
    searchPlaceholder?: string;
    dropdowns?: FilterDropdownConfig[];
    customFilters?: React.ReactNode;
    onClear: () => void;
    onApply?: () => void;
}

export const GlobalFilters = React.memo(function GlobalFilters({
    showSearch = true,
    searchQuery = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    dropdowns = [],
    customFilters,
    onClear,
    onApply,
}: GlobalFiltersProps) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <div className="w-full bg-white mb-6">
            {/* Header (Always Visible) */}
            <div className="bg-[#2563eb] flex justify-between items-center px-4 py-3 text-white">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Search & Filters</span>
                </div>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition-colors"
                >
                    {isVisible ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            <span>Hide</span>
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            <span>Show</span>
                        </>
                    )}
                </button>
            </div>

            {/* Body (Collapsible) */}
            {isVisible && (
                <div className="p-5 flex flex-col gap-4 border border-t-0 border-gray-200">

                    {/* Search Input */}
                    {showSearch && onSearchChange && (
                        <div className="relative w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder={searchPlaceholder}
                                className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-all font-mono"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        </div>
                    )}

                    {/* Filters Container */}
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Dynamic Standard Dropdowns */}
                        {dropdowns.map((dropdown, index) => (
                            <div key={index} className="relative flex-1">
                                <select
                                    value={dropdown.value}
                                    onChange={(e) => dropdown.onChange(e.target.value)}
                                    disabled={dropdown.disabled}
                                    className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none appearance-none focus:outline-none focus:border-blue-500 text-gray-600 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed font-mono"
                                >
                                    {dropdown.placeholder && (
                                        <option value="" disabled hidden>{dropdown.placeholder}</option>
                                    )}
                                    {dropdown.options.map((opt, i) => (
                                        <option key={i} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        ))}

                        {/* Custom Filters (if any) */}
                        {customFilters}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-4 mt-2">
                        <button
                            onClick={onClear}
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            Clear
                        </button>
                        {onApply && (
                            <button
                                onClick={onApply}
                                className="bg-[#e2e8f0] text-gray-800 text-sm font-medium px-6 py-2 rounded-none hover:bg-gray-300 transition-colors"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
});