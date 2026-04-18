"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubmissionResult } from "../apis/result.api";

export function useSubmissionResult(submissionId: string) {
    return useQuery({
        queryKey: ["submission-result", submissionId],
        queryFn: () => getSubmissionResult(submissionId),
        enabled: !!submissionId,
        staleTime: 1000 * 60 * 5, 
        retry: 1, 
    });
}