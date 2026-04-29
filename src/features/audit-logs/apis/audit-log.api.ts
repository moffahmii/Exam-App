'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { IApiResponse } from "@/shared/types/api";
import { AuditLog, AuditLogsParams, AuditLogsResponse } from "@/shared/types/audit-logs";

export async function getAuditLogs(params: AuditLogsParams): Promise<AuditLogsResponse> {
    try {
        const jwt = await getNextAuthToken();
        const token = jwt?.token;

        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());
        if (params.search?.trim()) queryParams.append('search', params.search.trim());
        if (params.category && params.category !== '--') queryParams.append('category', params.category);
        if (params.action && params.action !== '--') queryParams.append('action', params.action);
        if (params.actorUserId) queryParams.append('actorUserId', params.actorUserId);
        if (params.sortBy && params.sortBy !== '--') queryParams.append('sortBy', params.sortBy);
        if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

        const queryString = queryParams.toString();
        const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/audit-logs${queryString ? `?${queryString}` : ''}`;

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
                message: response.statusText || "Failed to fetch audit logs"
            };
        }

        return await response.json();
    } catch (error) {
        return {
            status: false,
            code: 500,
            message: "Internal server error occurred while fetching audit logs"
        };
    }
}

