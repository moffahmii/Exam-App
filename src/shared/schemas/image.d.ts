import z from "zod"
import { ImageScheme } from "./photo-scheme"

export type ImageField = z.infer<typeof ImageScheme>
export interface IUploadImageResponse {
    url: string
}