import { z } from "zod";

const emailField = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address");

const passwordField = z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number");

const otpField = z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers");

const usernameField = z
    .string()
    .min(3, "Username must be at least 3 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores");

export const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});
export type LoginFormValues = z.infer<typeof loginSchema>;


export const emailSchema = z.object({
    email: emailField,
});
export type EmailFormValues = z.infer<typeof emailSchema>;

export const otpSchema = z.object({
    otp: otpField,
});
export type OTPFormValues = z.infer<typeof otpSchema>;

export const userInfoSchema = z.object({
    firstName: z
        .string()
        .min(2, "First name is too short")
        .regex(/^[a-zA-Z]+$/, "First name must contain only letters"),
    lastName: z
        .string()
        .min(2, "Last name is too short")
        .regex(/^[a-zA-Z]+$/, "Last name must contain only letters"),
    username: usernameField,
    phone: z
        .string()
        .regex(/^01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
});
export type UserInfoValues = z.infer<typeof userInfoSchema>;

export const passwordSchema = z.object({
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type PasswordFormValues = z.infer<typeof passwordSchema>;

export const changeEmailSchema = z.object({
    email: emailField,
    otp: otpField.optional(),
});
export type ChangeEmailFormData = z.infer<typeof changeEmailSchema>;

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;