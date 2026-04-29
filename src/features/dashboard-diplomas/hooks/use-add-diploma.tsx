import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDiploma } from '../apis/add-diploma-api';
import { DiplomaField } from '@/features/upload-photo/scheme/photo-scheme';

export function useCreateDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: DiplomaField) => {
            return await createDiploma(data);
        },
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ['diplomas'] });
            }
        },
    });
}