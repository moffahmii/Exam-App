"use client";

import React, { use } from "react"; // 1. استورد 'use' من react
import { Loader2, AlertCircle } from "lucide-react";
import { useSubmissionResult } from "@/app/(website)/_hooks/use-submissoin-result";
import SubmissionResults from "./SubmissonResult";

// 2. عدل الـ Type بتاع الـ params ليكون Promise
export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {

    // 3. فك الـ Promise باستخدام use()
    const resolvedParams = use(params);

    // 4. استخدم الـ id بعد ما اتفك
    const { data, isLoading, isError, error } = useSubmissionResult(resolvedParams.id);

    // ... (باقي الكود زي ما هو بالظبط من غير أي تغيير)

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] font-mono">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                <p className="text-slate-500 text-lg animate-pulse">Loading your exam results...</p>
            </div>
        );
    }

    if (isError || !data || !data.submission || !data.analytics) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 font-mono text-center px-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 flex items-center justify-center rounded-full mb-2">
                    <AlertCircle className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Oops! Something went wrong</h2>
                <p className="text-slate-600 max-w-md">
                    {error?.message || "We couldn't load the submission data. Please try again later."}
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <SubmissionResults
                data={data}
                onRestart={() => console.log("Restart clicked")}
                onExplore={() => console.log("Explore clicked")}
            />
        </div>
    );
}