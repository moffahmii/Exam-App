export const USER_ROLES = {
    SUPERADMIN: "SUPERADMIN",
    ADMIN: "ADMIN",
    USER: "USER",
} as const;

export type Role = typeof USER_ROLES[keyof typeof USER_ROLES];

export const PERMISSIONS = {
    EXAM: {
        CREATE: "EXAM_CREATE",
        READ: "EXAM_READ",
        UPDATE: "EXAM_UPDATE",
        DELETE: "EXAM_DELETE",
    },
    QUESTION: {
        CREATE: "QUESTION_CREATE",
        READ: "QUESTION_READ",
        UPDATE: "QUESTION_UPDATE",
        DELETE: "QUESTION_DELETE",
    },
    DIPLOMA: {
        CREATE: "DIPLOMA_CREATE",
        READ: "DIPLOMA_READ",
        UPDATE: "DIPLOMA_UPDATE",
        DELETE: "DIPLOMA_DELETE",
    },
    USER: {
        MANAGE: "USER_MANAGE",
    },
    AUDIT_LOG: {
        READ: "AUDIT_LOG_READ",
        DELETE: "AUDIT_LOG_DELETE",
    },
} as const;

export type Permission =
    | typeof PERMISSIONS.EXAM[keyof typeof PERMISSIONS.EXAM]
    | typeof PERMISSIONS.QUESTION[keyof typeof PERMISSIONS.QUESTION]
    | typeof PERMISSIONS.DIPLOMA[keyof typeof PERMISSIONS.DIPLOMA]
    | typeof PERMISSIONS.USER[keyof typeof PERMISSIONS.USER]
    | typeof PERMISSIONS.AUDIT_LOG[keyof typeof PERMISSIONS.AUDIT_LOG];


export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
    [USER_ROLES.SUPERADMIN]: [
        ...Object.values(PERMISSIONS.EXAM),
        ...Object.values(PERMISSIONS.QUESTION),
        ...Object.values(PERMISSIONS.DIPLOMA),
        ...Object.values(PERMISSIONS.USER),
        ...Object.values(PERMISSIONS.AUDIT_LOG), 
    ],

    [USER_ROLES.ADMIN]: [
        ...Object.values(PERMISSIONS.EXAM),
        ...Object.values(PERMISSIONS.QUESTION),
        ...Object.values(PERMISSIONS.DIPLOMA),
        PERMISSIONS.AUDIT_LOG.READ, 
    ],

    [USER_ROLES.USER]: [
        PERMISSIONS.EXAM.READ,
        PERMISSIONS.QUESTION.READ,
        PERMISSIONS.DIPLOMA.READ,
    ],
};

// 4. دالة الفحص
export function hasPermission(userRole: Role | string | undefined, requiredPermission: Permission): boolean {
    if (!userRole) return false;

    const userPermissions = ROLE_PERMISSIONS[userRole as Role];
    if (!userPermissions) return false;

    return userPermissions.includes(requiredPermission);
}