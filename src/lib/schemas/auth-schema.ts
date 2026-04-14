import { z } from "zod";
// Schemas for form validation using Zod

// Email validation schema
export const emailSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address"),
});
export type EmailFormValues = z.infer<typeof emailSchema>;

// OTP validation schema
export const otpSchema = z.object({
    otp: z
        .string()
        .length(6, "OTP must be exactly 6 digits")
        .regex(/^\d+$/, "OTP must contain only numbers"),
});
export type OTPFormValues = z.infer<typeof otpSchema>;

// User Info validation schema
export const userInfoSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name is too short")
        .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
    lastName: z
        .string()
        .min(2, "Last name is too short")
        .regex(/^[a-zA-Z]+$/, "Last name must contain only letters"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
    phone: z
        .string()
        .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});
export type UserInfoValues = z.infer<typeof userInfoSchema>;

// Password validation schema
export const passwordSchema = z.object({
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], 
});
export type PasswordFormValues = z.infer<typeof passwordSchema>;