import { USER_ROLES } from "../../features/auth/constants/user.constant";

const POLICIES = {
    [USER_ROLES.USER]: {
        can: ["read"],
    },
    [USER_ROLES.ADMIN]: {
        can: ["read", "write", "delete"],
    },
    [USER_ROLES.SUPERADMIN]: {
        can: ["read", "write", "delete", "manage"],
    },
} as const;