'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { AuditLog } from '../types/audit-logs';
import { AuditActions } from './audit-actions';
import { AuditLogsSort } from './audit-sort';

interface AuditLogsTableProps {
    logs: AuditLog[];
    sortValue: string;
    onSortChange: (value: string) => void;
}

const getActionColorHex = (action?: string) => {
    const normalized = action?.trim().toUpperCase();
    switch (normalized) {
        case 'CREATE': return '#009966';
        case 'UPDATE': return '#CA8A04';
        case 'DELETE': return '#DC2626';
        default: return '#6b7280';
    }
};

const getRoleColorHex = (role: string) => {
    return role === 'Super Admin' ? '#dc2626' : '#2563eb';
};

const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        dayDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    };
};

export default function AuditLogsTable({ logs, sortValue, onSortChange }: AuditLogsTableProps) {
    return (
        <div className="w-full overflow-visible bg-white">
            <Table className="table-fixed w-full p-4">
                {/* HEADER */}
                <TableHeader className="bg-blue-600">
                    <TableRow>
                        <TableHead className="w-30 text-white text-sm font-medium uppercase">Action</TableHead>
                        <TableHead className="w-62.5 text-white text-sm font-medium uppercase">User</TableHead>
                        <TableHead className="w-95 text-white text-sm font-medium uppercase">Entity</TableHead>
                        <TableHead className="w-50 text-white text-sm font-medium uppercase">Time</TableHead>
                        <TableHead className="w-20 text-right">
                            <div className="flex justify-end pr-2">
                                <AuditLogsSort value={sortValue} onChange={onSortChange} />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                {/* BODY */}
                <TableBody>
                    {logs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                No audit logs found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        logs.map((log) => {
                            const { time, dayDate } = formatDateTime(log.createdAt);
                            return (
                                <TableRow key={log.id} className="border-b border-gray-100">
                                    <TableCell className="w-30">
                                        <div className="font-bold text-sm" style={{ color: getActionColorHex(log.action) }}>
                                            {log.action}
                                        </div>
                                        <div className="text-xs text-gray-400">Method: {log.httpMethod}</div>
                                    </TableCell>

                                    <TableCell className="w-62.5">
                                        <div className="font-medium text-sm truncate">{log.actorUsername}</div>
                                        <div className="text-sm text-gray-400 truncate">{log.actorEmail}</div>
                                        <div className="text-xs font-semibold" style={{ color: getRoleColorHex(log.actorRole) }}>
                                            {log.actorRole}
                                        </div>
                                    </TableCell>

                                    <TableCell className="w-95">
                                        <div className="text-sm font-medium">{log.category}</div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400 truncate">
                                            {log.entityId}
                                            <ExternalLink className="w-3 h-3 shrink-0 cursor-pointer hover:text-blue-600 transition-colors" />
                                        </div>
                                    </TableCell>

                                    <TableCell className="w-50">
                                        <div className="text-sm font-medium">{time}</div>
                                        <div className="text-xs text-gray-500">{dayDate}</div>
                                    </TableCell>

                                    <TableCell className="w-20 text-right pr-4">
                                        <AuditActions log={log} />
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    );
}