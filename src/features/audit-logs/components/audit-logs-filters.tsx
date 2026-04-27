'use client';
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronUp, ChevronDown, Search, ChevronsUpDown } from 'lucide-react';

interface SearchFiltersProps {
    onFilterChange: (filters: { search: string; category: string; action: string }) => void;
    onClear: () => void;
    isLoading?: boolean;
    initialValues?: {
        search: string;
        category: string;
        action: string;
    }
}

export const AuditLogsSearchFilters = React.memo(function AuditLogsSearchFilters({
    onFilterChange,
    onClear,
    isLoading,
    initialValues
}: SearchFiltersProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState(initialValues?.search || '');
    const [category, setCategory] = useState(initialValues?.category || '');
    const [action, setAction] = useState(initialValues?.action || '');

    const handleApply = () => {
        onFilterChange({
            search: search.trim(),
            category,
            action
        });
    };

    const handleClear = () => {
        setSearch('');
        setCategory('');
        setAction('');
        onClear();
    };

    return (
        <div className="w-full bg-white">
            {/* Header */}
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

            {/* Body */}
            {isVisible && (
                <div className="p-5 flex flex-col gap-4 border-t border-gray-100">
                    {/* Search Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by actor username, email, entity type..."
                            className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-all font-mono"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 1. Category Select */}
                        <div className="relative flex-1">
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                disabled={isLoading}
                                className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none appearance-none focus:outline-none focus:border-blue-500 text-gray-600 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed font-mono"
                            >
                                <option value="" disabled hidden>Category</option>
                                <option value="">All Categories</option>
                                <option value="DIPLOMA">DIPLOMA</option>
                                <option value="EXAM">EXAM</option>
                                <option value="QUESTION">QUESTION</option>
                                <option value="USER">USER</option>
                                <option value="SYSTEM">SYSTEM</option>
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* 2. Action Select */}
                        <div className="relative flex-1">
                            <select
                                value={action}
                                onChange={(e) => setAction(e.target.value)}
                                disabled={isLoading}
                                className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm appearance-none focus:outline-none focus:border-blue-500 text-gray-600 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed font-mono"
                            >
                                <option value="" disabled hidden>Action</option>
                                <option value="">All Actions</option>
                                <option value="CREATE">CREATE</option>
                                <option value="UPDATE">UPDATE</option>
                                <option value="DELETE">DELETE</option>
                                <option value="SET_IMMUTABLE">SET_IMMUTABLE</option>
                                <option value="SEED_DATA">SEED_DATA</option>
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-4 mt-2">
                        <button
                            onClick={handleClear}
                            disabled={isLoading}
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors disabled:opacity-50"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleApply}
                            disabled={isLoading}
                            className="bg-[#e2e8f0] text-gray-800 text-sm font-medium px-6 py-2 rounded-none hover:bg-gray-300 transition-colors disabled:opacity-50"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});