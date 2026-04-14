'use client';

import useDiplomas from '@/app/(website)/_hooks/use-diplomas';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import SortDropdown, { SortType } from '../../_components/SortDropdown';
import DiplomaActionsDropdown from '../../_components/DiplomaActionsDropdown';

export default function DiplomasTable() {
    const {
        data,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useDiplomas();

    const [sortType, setSortType] = useState<SortType>('newest_desc');
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const diplomas = data?.pages.flatMap((page) => page.data) || [];

    const sortedDiplomas = useMemo(() => {
        const list = [...diplomas];

        switch (sortType) {
            case 'title_asc':
                return list.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            case 'title_desc':
                return list.sort((a, b) =>
                    b.title.localeCompare(a.title)
                );
            case 'newest_asc':
                return list.sort(
                    (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                );
            case 'newest_desc':
                return list.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            default:
                return list;
        }
    }, [diplomas, sortType]);

    const gridLayout =
        "grid grid-cols-[100px_200px_1fr_80px] gap-4 items-center px-4";

    // Infinite scroll
    useEffect(() => {
        if (!loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (isLoading) {
        return (
            <div className="w-full flex justify-center items-center min-h-150">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="w-full text-center text-red-500 py-6">
                حدث خطأ أثناء جلب البيانات
            </div>
        );
    }

    return (
        <div className="w-full font-mono">

            {/* HEADER */}
            <div className="w-full overflow-x-auto">
                <div className="min-w-200">
                    <div className={`bg-blue-600 text-white p-4 text-sm font-medium ${gridLayout}`}>
                        <div>Image</div>
                        <div>Title</div>
                        <div>Description</div>
                        {/* 🔥 هنا بقى كومبوننت لوحده */}
                        <SortDropdown
                            value={sortType}
                            onChange={setSortType}
                        />
                    </div>
                    {/* BODY */}
                    <div className="bg-white divide-y divide-gray-200">
                        {sortedDiplomas.length === 0 ? (
                            <div className="py-8 text-center text-gray-500">
                                لا توجد دبلومات حالياً
                            </div>
                        ) : (
                            sortedDiplomas.map((diploma) => (
                                <div
                                    key={diploma.id}
                                    className={`py-4 hover:bg-gray-50 transition ${gridLayout}`}
                                >
                                    <img
                                        src={diploma.image || 'https://via.placeholder.com/150'}
                                        className="w-17.5 h-18 object-cover border"
                                    />
                                    <div className="text-sm font-medium truncate">
                                        {diploma.title}
                                    </div>
                                    <div className="text-sm text-gray-500 line-clamp-2">
                                        {diploma.description}
                                    </div>
                                    <DiplomaActionsDropdown id={diploma.id} />
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            {/* Infinite Scroll Trigger */}
            <div
                ref={loadMoreRef}
                className="h-10 flex justify-center items-center"
            >
                {isFetchingNextPage && (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
                )}
            </div>
        </div>
    );
}