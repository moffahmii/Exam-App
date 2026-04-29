import { IApiResponse } from '@/shared/types/api';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';
export type AuditCategory = 'DIPLOMA' | 'EXAM' | 'USER' | 'CATEGORY' | 'SETTING';
export type ActorRole = 'ADMIN' | 'SUPER_ADMIN';

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

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

export interface AuditLogsPayload {
    data: AuditLog[];
    metadata: PaginationMeta;
}

export type AuditLogsResponse = IApiResponse<AuditLogsPayload>;