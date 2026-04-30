import { DiplomasApiResponse, DiplomasPayload } from '@/shared/types/diplomas';
import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

export const fetchAllDiplomas = async (): Promise<DiplomasPayload | null> => {
    try {
        const response = await fetch('/api/diplomas?limit=20');
        const result: DiplomasApiResponse = await response.json();

        if (!response.ok || !result.status) {
            throw new Error(result.message || "Failed to fetch diplomas");
        }

        return result.payload;
    } catch (error) {
        console.error('Error fetching diplomas:', error);
        return null;
    }
};


export default function useDiplomas() {
    const { data: session, status } = useSession();

    return useQuery({
        queryKey: ['diplomas'],
        queryFn: fetchAllDiplomas,
        enabled: status === "authenticated",
        refetchOnMount: true,
        retry: 2,
        staleTime: 10 * 60 * 1000,
    });
}
