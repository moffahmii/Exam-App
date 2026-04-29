'use server';

import { IApiResponse } from "@/shared/types/api";
import { AuditLog } from "@/shared/types/audit-logs";
import { getNextAuthToken } from "@/shared/utils/auth.util";
import { withPermission } from "@/shared/utils/auth-action";
import { PERMISSIONS } from "@/shared/utils/permissions.util";

export const getAuditLogById = withPermission(
    PERMISSIONS.AUDIT_LOG.READ,
    async (id: string): Promise<IApiResponse<AuditLog>> => {
        try {
            const jwt = await getNextAuthToken();
            const token = jwt?.token;
            const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs/${id}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                cache: 'no-store'
            });

            if (!response.ok) {
                return {
                    status: false,
                    code: response.status,
                    message: response.statusText || "Failed to fetch audit log details"
                };
            }

            return await response.json();
        } catch (error) {
            return {
                status: false,
                code: 500,
                message: "Internal server error occurred while fetching audit log details"
            };
        }
    }
);