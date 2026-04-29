"use client";

import { useQuery } from "@tanstack/react-query";
import { getSubmissionResult } from "../apis/result.api";
import { SubmissionData } from "@/shared/types/sub,ission";

export function useSubmissionResult(submissionId: string) {
    return useQuery<SubmissionData, Error>({ // 👈 حددنا نوع الداتا ونوع الخطأ
        queryKey: ["submission-result", submissionId],
        queryFn: () => getSubmissionResult(submissionId),
        enabled: !!submissionId,
        staleTime: 1000 * 60 * 5,
        retry: 1,
    });
}