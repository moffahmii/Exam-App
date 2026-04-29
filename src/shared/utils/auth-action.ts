// lib/auth-action.ts
import { getServerSession } from "next-auth";
import { hasPermission, Permission } from "./permissions.util";
import { authOptions } from "../../../auth";

export function withPermission(requiredPermission: Permission, action: Function) {
    return async (...args: any[]) => {
        const session = await getServerSession(authOptions);

        if (!hasPermission(session?.user?.role, requiredPermission)) {
            throw new Error("Access Denied: You do not have the required permissions.");
        }

        return action(...args, session);
    };
}