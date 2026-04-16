import React from "react";

export default function ExamSkeleton() {
    return (
        <div className="bg-white font-mono min-h-screen">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
                <div className="flex-1 animate-pulse">

                    {/* Progress Section Skeleton */}
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                            <div className="h-5 bg-gray-200 rounded w-24"></div>
                            <div className="h-4 bg-gray-200 rounded w-32"></div>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-200 w-1/3"></div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Question Title Skeleton */}
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-1/2 mb-8"></div>

                        {/* Answers Skeleton */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div
                                    key={index}
                                    className="flex items-center p-4 border border-gray-200 rounded-lg h-16 bg-gray-50"
                                >
                                    <div className="w-4 h-4 bg-gray-300 rounded-full mr-3"></div>
                                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons Skeleton */}
                        <div className="flex justify-between items-center mt-10 border-t pt-6 gap-6">
                            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                            <div className="flex-1 h-12 bg-gray-200 rounded"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}