"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllExamsAction } from "../apis/exams-api";

export const useExams = ( id: string) => {
    return useQuery({
        queryKey: ["exams", id ],
        queryFn: () => getAllExamsAction(id),
        staleTime: 1000 * 60 * 5,
        enabled: !!id,
    });
};