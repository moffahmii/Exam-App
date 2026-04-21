'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { AuditLogsParams, AuditLogsResponse } from "../types/audit-logs";

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

        // تم حل مشكلة الـ TypeScript هنا (شيلنا المقارنة بـ '--')
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

        // 4. معالجة الرد
        if (!response.ok) {
            console.error(`API Error with status: ${response.status}`);
            return {
                status: false,
                code: response.status,
                payload: { data: [] }
            };
        }

        const data: AuditLogsResponse = await response.json();
        return data;

    } catch (error) {
        console.error("AuditLogs Action Error:", error);
        return {
            status: false,
            code: 500,
            payload: { data: [] }
        };
    }
}