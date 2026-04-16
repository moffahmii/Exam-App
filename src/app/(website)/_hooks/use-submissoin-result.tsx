"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubmissionResult } from "@/lib/api/website/exam-questions.api";

/**
 * @param submissionId - معرف العملية المراد جلب نتائجها
 */
export function useSubmissionResult(submissionId: string) {
    return useQuery({
        queryKey: ["submission-result", submissionId],
        queryFn: () => getSubmissionResult(submissionId),
        enabled: !!submissionId,
        staleTime: 1000 * 60 * 5, 
        retry: 1, 
    });
}