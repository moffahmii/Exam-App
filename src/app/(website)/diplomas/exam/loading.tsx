import React from 'react';

export default function LoadingExams() {
    // نكرر العنصر 3 مرات ليعطي إيحاء بوجود قائمة جاري تحميلها
    const skeletonItems = [1, 2, 3];

    return (
        <main className="min-h-screen bg-gray-900">
            <div className="container mx-auto">
                <div className="bg-white p-6 space-y-4">

                    {skeletonItems.map((item) => (
                        <div
                            key={item}
                            className="flex flex-col md:flex-row items-start h-29 md:items-center bg-blue-50/50 gap-4 p-4 border border-blue-100/50"
                        >
                            {/* Image Skeleton */}
                            {/* استخدمت نفس الأبعاد التقريبية w-25 h-25 */}
                            <div className="relative w-[100px] h-[100px] bg-gray-200 animate-pulse shrink-0 border border-blue-200"></div>

                            {/* Exam Details Skeleton */}
                            <div className="grow w-full">
                                <div className="flex flex-col md:flex-row justify-between gap-2 mb-3">
                                    {/* Title Skeleton */}
                                    <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>

                                    {/* Meta Info Skeleton (Questions & Duration) */}
                                    <div className="flex items-center gap-4">
                                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Description Skeleton (سطرين) */}
                                <div className="space-y-2 mt-4">
                                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                </div>
                            </div>

                            {/* Button Skeleton (يظهر في الشاشات الكبيرة فقط كما في التصميم الأصلي) */}
                            <div className="hidden md:block shrink-0">
                                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}

                    {/* End of list Skeleton */}
                    <div className="flex justify-center h-5.25 py-2.5 mt-6">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                </div>
            </div>
        </main>
    );
}