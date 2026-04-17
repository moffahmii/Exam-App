"use client";

import React, { use } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { useSubmissionResult } from "@/app/(website)/_hooks/use-submissoin-result";
import SubmissionResults from "./SubmissonResult";
import { ResultsSkeleton } from "../ResultSekelton";

// 2. عدل الـ Type بتاع الـ params ليكون Promise
export default function ResultPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const { data, isLoading, isError, error } = useSubmissionResult(resolvedParams.id);

    if (isLoading) {
        return <ResultsSkeleton />;
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
        <SubmissionResults
            data={data}
            onRestart={() => console.log("Restart clicked")}
            onExplore={() => console.log("Explore clicked")}
        />
    );
}