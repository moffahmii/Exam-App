import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDiploma } from '../apis/add-diploma-api';

export function useCreateDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDiploma,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['diplomas'] });
        },
    });
}