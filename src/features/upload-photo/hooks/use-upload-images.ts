import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { ImageField } from '../scheme/photo-scheme'
import axios from 'axios'

export default function useUploadImage() {
    const [uploadProgress, setUploadProgress] = useState(0)

    const mutation = useMutation({
        mutationFn: async (field: ImageField) => {
            setUploadProgress(0);

            const formData = new FormData()
            formData.append('image', field.image)

            const response = await axios.post('/api/image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                onUploadProgress: (progressEvent) => {
                    if (progressEvent.total) {
                        const percent = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percent);
                    }
                }
            });

            if (response.data.status === true || response.status === 201) {
                return response.data.payload.url;
            }

            throw new Error(response.data.message || "Failed to upload image");
        }
    });

    return { ...mutation, uploadProgress };
}