'use client';

import React, { useState } from 'react';

export type SortType =
    | 'title_asc'
    | 'title_desc'
    | 'newest_asc'
    | 'newest_desc';

interface Props {
    value: SortType;
    onChange: (value: SortType) => void;
}

export default function SortDropdown({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);

    const options = [
        { label: 'Title (A → Z)', value: 'title_asc' },
        { label: 'Title (Z → A)', value: 'title_desc' },
        { label: 'Newest First', value: 'newest_desc' },
        { label: 'Oldest First', value: 'newest_asc' },
    ] as const;

    return (
        <div className="relative flex justify-center">

            {/* Trigger */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="hover:text-blue-200 transition"
            >
                Sort ⬇
            </button>

            {/* Dropdown */}
            {open && (
                <>
                    {/* overlay */}
                    <div
                        className="fixed inset-0"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute top-8 right-0 bg-white text-black w-52 rounded-md shadow-lg z-20 overflow-hidden">
                        {options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => {
                                    onChange(opt.value);
                                    setOpen(false);
                                }}
                                className={`block w-full text-left px-3 py-2 hover:bg-gray-100 ${value === opt.value ? 'bg-gray-50 font-medium' : ''
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}