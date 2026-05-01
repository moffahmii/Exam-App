import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024; // 1MB
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp" 
];

export const ImageScheme = z.object({
    image: z
        .any()
        .refine((file) => file instanceof File, "Please select an image file.")
        .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size allowed is 1MB.")
        .refine(
            (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
            "Only .jpg, .jpeg, .png, and .webp formats are supported."
        ),
});

export const DiplomaScheme = z.object({
    image: z.string().min(1, "Please upload an image first."), 
    title: z.string().min(3, "Title must be at least 3 characters."),
    description: z.string().min(10, "Description must be at least 10 characters."),
});

export type ImageField = z.infer<typeof ImageScheme>;
export type DiplomaField = z.infer<typeof DiplomaScheme>;