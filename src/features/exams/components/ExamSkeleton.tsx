import React from 'react';

export default function LoadingExams() {
    const skeletonItems = [1, 2, 3];

    return (
        <main className="min-h-screen  py-8">
            <div className="container mx-auto ">
                <div className="bg-white p-4 space-y-4 ">
                    {skeletonItems.map((item) => (
                        <div
                            key={item}
                            className="flex flex-col md:flex-row items-start md:items-center bg-blue-50/50 gap-4 p-4 border border-blue-100/50 rounded-md"
                        >
                            <div className="relative w-25 h-25 bg-gray-200 animate-pulse shrink-0 border border-blue-200"></div>
                            {/* Exam Details Skeleton */}
                            <div className="grow w-full">
                                <div className="flex flex-col md:flex-row justify-between gap-2 mb-3">
                                    <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    </div>
                                </div>
                                <div className="space-y-2 mt-4">
                                    <div className="h-3 bg-gray-200 rounded w-full animate-pulse"></div>
                                    <div className="h-3 bg-gray-200 rounded w-4/5 animate-pulse"></div>
                                </div>
                            </div>
                            
                            <div className="hidden md:block shrink-0">
                                <div className="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-center py-2.5 mt-6 border-t border-gray-100">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                </div>
            </div>
        </main>
    );
}