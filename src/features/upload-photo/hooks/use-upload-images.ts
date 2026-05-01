import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ImageField } from '../../../shared/schemas/photo-scheme';

export default function useUploadImage() {
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const mutation = useMutation({
        mutationFn: async (field: ImageField) => {
            // Reset progress before starting a new upload
            setUploadProgress(0);

            const formData = new FormData();
            formData.append('image', field.image);

            const response = await axios.post('/api/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                // Track upload progress and update state
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percent);
                    }
                }
            });

            // Validate successful response based on expected API structure
            if (response.data?.status === true || response.status === 201) {
                return response.data.payload.url;
            }

            throw new Error(response.data?.message || 'Failed to upload image');
        }
    });

    return {
        ...mutation,
        uploadProgress
    };
}