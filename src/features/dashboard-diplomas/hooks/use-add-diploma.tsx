// use-add-diploma.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDiploma } from '../apis/add-diploma-api';
import { DiplomaField } from '@/shared/schemas/photo-scheme';

export function useCreateDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DiplomaField) => {
            return await createDiploma(data);
        },
        onSuccess: () => {
            // شيلنا الـ if condition عشان نضمن إن الكاش هيتمسح 100%
            queryClient.invalidateQueries({ queryKey: ['diplomas'] });
        },
    });
}