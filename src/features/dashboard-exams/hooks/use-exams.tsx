'use client';

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { IExamsResponse } from "../types/exam";

type ExamsParams = {
    page: number;
    limit: number;
    search?: string;
    diplomaId?: string;
    immutable?: string;
    sortBy?: string;
    sortOrder?: string;
};

export const useExams = (params: ExamsParams) => {
    return useQuery({
        /**
         * Stable query key to prevent unnecessary refetches
         */
        queryKey: [
            "exams",
            params.page,
            params.limit,
            params.search,
            params.diplomaId,
            params.immutable,
            params.sortBy,
            params.sortOrder,
        ],

        queryFn: async (): Promise<IExamsResponse["payload"]> => {
            const query = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    query.append(key, String(value));
                }
            });

            const res = await fetch(`/api/exams?${query.toString()}`);
            if (!res.ok) {
                throw new Error("Failed to fetch exams");
            }
            const data: IExamsResponse = await res.json();
            return data.payload;
        },

        /**
         * UX Improvements
         */
        placeholderData:keepPreviousData,
        staleTime: 1000 * 60 * 2, // 2 minutes
    });
};