import { useQuery } from '@tanstack/react-query';

export const fetchAllDiplomas = async () => {
    const response = await fetch(`/api/diplomas?limit=50`);
    if (!response.ok) throw new Error('Network response was not ok');
    const result = await response.json();
    return result.payload;
};

export default function useDiplomas() {
    return useQuery({
        queryKey: ['diplomas'], 
        queryFn: fetchAllDiplomas,
        staleTime: 10 * 60 * 1000, 
    });
}