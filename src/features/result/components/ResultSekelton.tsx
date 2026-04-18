import React from "react";

export function ResultsSkeleton() {
    const dummyQuestions = [1, 2, 3];

    return (
        <div className="bg-white font-mono p-6 h-auto w-full">
            <div className="max-w-7xl mx-auto flex flex-col gap-6">
                <div className="h-7 w-28 bg-blue-100 rounded animate-pulse mb-1" />
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/3 bg-blue-50/50 border border-blue-100 p-8 flex flex-col items-center justify-center min-h-100">
                        <div className="w-48 h-48 rounded-full border-30 border-blue-100/50 animate-pulse" />
                        <div className="flex flex-col gap-4 mt-8">
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-emerald-100/60 animate-pulse" />
                                <div className="h-4 w-24 bg-blue-100/60 rounded animate-pulse" />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-4 h-4 bg-rose-100/60 animate-pulse" />
                                <div className="h-4 w-24 bg-blue-100/60 rounded animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/3 border-2 border-dashed border-blue-100/60 p-4">
                        <div className="space-y-8 p-2">
                            {dummyQuestions.map((i) => (
                                <div key={i} className="space-y-4">
                                    <div className="h-6 w-3/4 bg-blue-100 rounded animate-pulse" />
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-4 p-4 h-12.5 bg-slate-50 animate-pulse">
                                            <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
                                            <div className="h-3 w-1/2 bg-slate-200 rounded" />
                                        </div>
                                        <div className="flex items-center gap-4 p-4 h-12.5 bg-slate-50 animate-pulse">
                                            <div className="w-5 h-5 rounded-full bg-slate-200 shrink-0" />
                                            <div className="h-3 w-1/3 bg-slate-200 rounded" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-8 gap-6">
                    <div className="flex-1 h-12 bg-slate-100 rounded animate-pulse" />
                    <div className="flex-1 h-12 bg-blue-100/50 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}