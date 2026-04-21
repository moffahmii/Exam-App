'use client';

import React from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { AuditLog } from '../types/audit-logs';

interface LogDetailsViewProps {
    log: AuditLog;
    onDelete?: (id: string) => void;
}

// ألوان العمليات (Hex) لضمان العمل مع Tailwind v4
const getActionColorHex = (action?: string) => {
    const normalized = action?.trim().toUpperCase();
    switch (normalized) {
        case 'CREATE': return '#16a34a'; // أخضر
        case 'UPDATE': return '#d97706'; // أصفر/برتقالي
        case 'DELETE': return '#dc2626'; // أحمر
        default: return '#6b7280'; // رمادي
    }
};

// ألوان الأدوار (Hex)
const getRoleColorHex = (role: string) => {
    const normalized = role?.trim().toLowerCase();
    return normalized === 'super admin' ? '#dc2626' : '#2563eb';
};

export default function LogDetailsView({ log, onDelete }: LogDetailsViewProps) {

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            dayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
        };
    };

    const { time, dayDate } = formatDateTime(log.createdAt);

    return (
        <div className="w-full space-y-6">

            {/* 1. رأس الصفحة - Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">
                        {log.category} {log.action.charAt(0).toUpperCase() + log.action.slice(1).toLowerCase()} By {log.actorUsername}
                    </h1>
                    <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500">
                        <span>Entity:</span>
                        <span className="underline decoration-gray-300 underline-offset-2">
                            {log.category} [{log.entityId}]
                        </span>
                        <ExternalLink className="w-3.5 h-3.5 cursor-pointer hover:text-blue-600 transition-colors" />
                    </div>
                </div>

                <button
                    onClick={() => onDelete?.(log.id)}
                    className="flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>

            {/* 2. كارت التفاصيل الرئيسي - Main Details Card */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8">

                {/* Action */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Action</h3>
                    <div className="font-bold text-sm" style={{ color: getActionColorHex(log.action) }}>
                        {log.action}
                    </div>
                </div>

                {/* Method */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Method</h3>
                    <div className="text-sm font-mono text-gray-800">
                        {log.httpMethod}
                    </div>
                </div>

                {/* User Info */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">User</h3>
                    <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-800">{log.actorUsername}</div>
                        <div className="text-xs font-mono text-gray-500">Email: {log.actorEmail}</div>
                        <div className="text-xs font-mono text-gray-500">IP Address: {log.ipAddress || '197.164.183.245'}</div>
                        <div className="text-xs font-mono text-gray-500">
                            Role: <span style={{ color: getRoleColorHex(log.actorRole) }}>{log.actorRole}</span>
                        </div>
                    </div>
                </div>

                {/* Date & Time */}
                <div>
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Date & Time</h3>
                    <div className="text-sm font-mono text-gray-800">
                        {time} | {dayDate}
                    </div>
                </div>

                {/* Metadata */}
                {log.metadata && (
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Metadata Content</h3>
                            <pre className="bg-[#f1f5f9] border border-gray-100 text-gray-700 p-4 rounded-md overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
                                {JSON.stringify(log.metadata, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}