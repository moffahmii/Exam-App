export const USER_ROLES = {
    SUPERADMIN: "SUPERADMIN",
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type Role = typeof USER_ROLES[keyof typeof USER_ROLES];