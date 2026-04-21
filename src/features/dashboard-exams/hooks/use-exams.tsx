'use client';
import { useQuery } from "@tanstack/react-query";
type ExamsParams = {
    page: number;
    limit: number;
    search?: string;
    diplomaId?: string;
    sortBy?: string;
    sortOrder?: string;
};
export const useExams = (params: ExamsParams) => {
    return useQuery({
        queryKey: ["exams", params],

        queryFn: async () => {
            const query = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    query.append(key, String(value));
                }
            });
            const res = await fetch(`/api/exams?${query.toString()}`, {
                method: "GET",
            });
            if (!res.ok) {
                throw new Error("Failed to fetch exams");
            }
            const data = await res.json();
            return data.payload; 
        },

        keepPreviousData: true,
    });
};