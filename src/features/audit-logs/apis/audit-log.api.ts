'use server'

import { getNextAuthToken } from "@/shared/utils/auth.util";
import { AuditLogsParams, AuditLogsResponse } from "../types/audit-logs";

// 1. الدالة بتاعتك اللي بتجيب اللوجز كلها (زي ما هي مفيهاش تغيير)
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

export async function getAuditLogById(id: string) {
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

        // ✅ التعديل هنا: بدل throw error، هنرجع object فيه حالة الفشل
        if (!response.ok) {
            console.error(`API Error fetching log ${id} with status: ${response.status}`);
            return {
                status: false,
                code: response.status,
                payload: null
            };
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("getAuditLogById Action Error:", error);
        // ✅ التعديل هنا بردو
        return {
            status: false,
            code: 500,
            payload: null
        };
    }
}