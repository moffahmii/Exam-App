'use client';

import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { AuditLog } from '../types/audit-logs'; // مسار الـ Types بتاعك
import { PageHeader } from '@/features/dashboard-header/components/header-page';

interface AuditLogDetailsProps {
    log: AuditLog;
    onDelete?: (id: string) => void;
}

// ==========================================
// الدوال المساعدة للألوان والتنسيق
// ==========================================
const getActionColor = (action: string) => {
    switch (action.toUpperCase()) {
        case 'CREATE': return 'text-[#009966]';
        case 'UPDATE': return 'text-[#CA8A04]';
        case 'DELETE': return 'text-[#DC2626]';
        default: return 'text-gray-500';
    }
};

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString('en-US', {
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true
    });
    const dayDate = date.toLocaleDateString('en-US', {
        weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'
    });
    return `${time} | ${dayDate}`;
};

const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// ==========================================
// مكون عرض التفاصيل
// ==========================================
export default function AuditLogDetailsClient({ log, onDelete }: AuditLogDetailsProps) {
    // تجهيز الداتا للعرض
    const title = `${capitalize(log.category)} ${capitalize(log.action)} By ${log.actorUsername}`;
    const dateTimeFormatted = formatDateTime(log.createdAt);

    // استخراج الحقول اللي اتعدلت (لو موجودة)
    const updatedFields = log.metadata?.keys?.join(', ') || 'None';

    // تجهيز الميتاداتا للعرض كـ JSON (بدون مصفوفة الـ keys عشان تظهر زي الصورة)
    const displayMetadata = { ...log.metadata };
    delete displayMetadata.keys;

    return (
        <div className="flex flex-col w-full min-h-screen bg-gray-100 gap-6">

            {/* ===== Header Section ===== */}
            <PageHeader>
                <div className="flex  justify-between sm:items-center gap-4 bg-white ">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 mb-1">{title}</h1>
                        <div className="flex items-center gap-1 text-sm text-gray-400">
                            <span>Entity:</span>
                            <span className="underline decoration-gray-300 underline-offset-2 flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                                {capitalize(log.category)} [{log.entityId}]
                                <ExternalLink className="w-3 h-3" />
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={() => onDelete?.(log.id)}
                        className="bg-[#DC2626] hover:bg-red-700 text-white flex items-center gap-2 px-6 h-10 shadow-sm"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </Button>
                </div>
            </PageHeader>

            {/* ===== Details Card ===== */}
            <div className="bg-white p-4 border border-gray-100 flex flex-col gap-8">

                {/* Action & Method */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Action</h3>
                        <p className={`font-bold text-sm uppercase ${getActionColor(log.action)}`}>
                            {log.action}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Method</h3>
                        <p className="text-gray-900 font-medium text-sm uppercase">
                            {log.httpMethod}
                        </p>
                    </div>
                </div>

                {/* User Info */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">User</h3>
                    <div className="flex flex-col gap-1 text-sm">
                        <p className="text-gray-900 font-medium">{log.actorUsername}</p>
                        <p className="text-gray-500 font-mono text-xs">Email: {log.actorEmail}</p>
                        <p className="text-gray-500 font-mono text-xs">IP Address: {log.ipAddress}</p>
                        <p className="text-gray-500 font-mono text-xs flex items-center gap-1">
                            Role:
                            <span className={log.actorRole === 'SUPER_ADMIN' ? 'text-red-500' : 'text-blue-600'}>
                                {log.actorRole.replace('_', ' ')}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Entity */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Entity</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                        <span className="font-medium capitalize">{log.category}:</span>
                        <span className="font-mono text-gray-700">{log.entityId}</span>
                        <ExternalLink className="w-4 h-4 text-gray-400 cursor-pointer hover:text-blue-600" />
                    </div>
                </div>

                {/* Date & Time */}
                <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Date & Time</h3>
                    <p className="text-gray-900 text-sm font-mono">{dateTimeFormatted}</p>
                </div>

                {/* Updated Fields */}
                {log.action === 'UPDATE' && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Updated Fields</h3>
                        <p className="text-gray-900 text-sm font-mono">{updatedFields}</p>
                    </div>
                )}

                {/* Metadata Raw Data */}
                {Object.keys(displayMetadata).length > 0 && (
                    <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Metadata</h3>
                        <div className="bg-gray-100 rounded-md p-4 overflow-x-auto">
                            <pre className="text-xs text-gray-700 font-mono leading-relaxed whitespace-pre-wrap">
                                {/* بنعرضها كـ JSON منسق ونشيل الأقواس الخارجية عشان تبقى شبه الصورة */}
                                {JSON.stringify(displayMetadata, null, 2)
                                    .replace(/^{/, '')
                                    .replace(/}$/, '')
                                    .trim()
                                }
                            </pre>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}