'use client';

import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
    id: string;
}

export default function DiplomaActionsDropdown({ id }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative flex justify-center">

            {/* Trigger */}
            <button
                onClick={() => setOpen((p) => !p)}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            >
                ⋯
            </button>

            {open && (
                <>
                    {/* overlay */}
                    <div
                        className="fixed inset-0"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute right-0 top-8 w-44 bg-white border rounded-md shadow-lg z-20 overflow-hidden">
                        {/* VIEW */}
                        <Link
                            href={`dashboard/diplomas/${id}`}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 hover:bg-gray-100"
                        >
                            View
                        </Link>
                        {/* EDIT */}
                        <Link
                            href={`/diplomas/${id}/edit`}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 hover:bg-gray-100"
                        >
                            Edit
                        </Link>
                        {/* DELETE (⚠️ مش best practice كـ link) */}
                        <Link
                            href={`/diplomas/${id}/delete`}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-2 text-red-500 hover:bg-gray-100"
                        >
                            Delete
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}