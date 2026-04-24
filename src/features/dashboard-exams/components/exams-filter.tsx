'use client';
import React, { useState } from 'react';
import { SlidersHorizontal, ChevronUp, ChevronDown, Search, ChevronsUpDown } from 'lucide-react';
import useDiplomas from '@/features/dashboard-diplomas/hooks/use-diplomas-details';

export interface IDiploma { id: string; title: string; }

interface SearchFiltersProps {
    onFilterChange: (filters: { search: string; diplomaId: string; immutable: string | boolean }) => void;
    onClear: () => void;
}

export const SearchFilters = React.memo(function SearchFilters({ onFilterChange, onClear }: SearchFiltersProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [search, setSearch] = useState('');
    const [diplomaId, setDiplomaId] = useState('');
    const [immutable, setImmutable] = useState('');

    const { data: diplomas = [], isLoading } = useDiplomas();

    const handleApply = () => {
        let parsedImmutable: string | boolean = immutable;
        if (immutable === 'true') parsedImmutable = true;
        if (immutable === 'false') parsedImmutable = false;

        onFilterChange({
            search: search.trim(),
            diplomaId,
            immutable: parsedImmutable
        });
    };

    const handleClear = () => {
        setSearch('');
        setDiplomaId('');
        setImmutable('');
        onClear();
    };

    return (
        <div className="w-full bg-white mb-6 ">
            {/* Header (دائماً ظاهر) */}
            <div className="bg-[#2563eb] flex justify-between items-center px-4 py-3 text-white">
                <div className="flex items-center gap-2 text-sm font-medium">
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Search & Filters</span>
                </div>
                <button
                    onClick={() => setIsVisible(!isVisible)}
                    className="flex items-center gap-1 text-sm text-blue-100 hover:text-white transition-colors"
                >
                    {/* تغيير النص والأيقونة بناءً على حالة الفتح والطي */}
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

            {/* Body (يظهر ويختفي بناءً على الحالة) */}
            {isVisible && (
                <div className="p-5 flex flex-col gap-4 border-t border-gray-100">
                    {/* Search Input */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by title"
                            className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none focus:outline-none focus:border-blue-500 placeholder:text-gray-400 transition-all font-mono"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* 1. Diploma Select */}
                        <div className="relative flex-1">
                            <select
                                value={diplomaId}
                                onChange={(e) => setDiplomaId(e.target.value)}
                                disabled={isLoading}
                                className="w-full border border-gray-200 py-2.5 pl-3 pr-10 text-sm rounded-none appearance-none focus:outline-none focus:border-blue-500 text-gray-600 bg-white cursor-pointer disabled:bg-gray-50 disabled:cursor-not-allowed font-mono"
                            >
                                <option value="" disabled hidden>Diploma</option>
                                <option value="">All Diplomas</option>
                                {diplomas?.map((diploma: IDiploma) => (
                                    <option key={diploma.id} value={diploma.id}>
                                        {diploma.title}
                                    </option>
                                ))}
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* 2. Immutability Select */}
                        <div className="relative flex-1">
                            <select
                                value={immutable}
                                onChange={(e) => setImmutable(e.target.value)}
                                className="w-full py-2.5 pl-3 pr-10 text-sm  appearance-none  text-gray-600 bg-white cursor-pointer "
                            >
                                <option value="" disabled hidden>Immutability</option>
                                <option value="">All</option>
                                <option value="true">Locked (True)</option>
                                <option value="false">Editable (False)</option>
                            </select>
                            <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end items-center gap-4 mt-2">
                        <button
                            onClick={handleClear}
                            className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleApply}
                            className="bg-[#e2e8f0] text-gray-800 text-sm font-medium px-6 py-2 rounded-none hover:bg-gray-300 transition-colors"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});