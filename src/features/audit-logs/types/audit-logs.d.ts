
export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type AuditCategory = 'DIPLOMA' | 'EXAM' | 'USER' | 'CATEGORY' | 'SETTING'; 
export type ActorRole = 'ADMIN' | 'SUPER_ADMIN';

export interface AuditLogMetadata {
    keys?: string[]; 
    title?: string;
    description?: string;
    image?: string;
    [key: string]: any; 
}

export interface AuditLog {
    id: string;
    createdAt: string;
    actorUserId: string;
    actorUsername: string;
    actorEmail: string;
    actorRole: ActorRole;
    category: AuditCategory;
    action: AuditAction;
    entityType: string;
    entityId: string;
    metadata: AuditLogMetadata | null;
    ipAddress: string;
    userAgent: string;
    httpMethod: string;
    path: string;
}


export interface AuditLogsParams {
    page?: number;
    limit?: number;
    category?: string;
    action?: string;
    actorUserId?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

/**
 * 6. الرد الشامل للـ API (API Response)
 * ده النوع اللي الـ Server Action والـ API هيرجعوه
 */
export interface AuditLogsResponse {
    status: boolean;
    code: number;
    payload: {
        data: AuditLog[];
        meta?: PaginationMeta;
    };
    message?: string; // اختياري عشان لو رجع رسالة خطأ
}