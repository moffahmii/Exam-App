'use client';

import React, { useState } from 'react';
import { Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { AuditLog } from '@/shared/types/audit-logs';
import { PageHeader } from '@/shared/components/custom/header-page';
import { GlobalDeleteModal } from '@/shared/components/custom/delete-modal';
import { useDeleteAuditLog } from '../hooks/use-delete-audit';

interface AuditLogDetailsClientProps {
    log: AuditLog;
}

const getActionColor = (action: string) => {
    switch (action?.toUpperCase()) {
        case 'CREATE': return 'text-green-600';
        case 'UPDATE': return 'text-yellow-600';
        case 'DELETE': return 'text-red-600';
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
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export default function AuditLogDetailsClient({ log }: AuditLogDetailsClientProps) {
    // حالة التحكم في فتح المودال
    const [openDelete, setOpenDelete] = useState(false);

    // استدعاء هوك المسح
    const { mutate, isPending } = useDeleteAuditLog();

    const title = `${capitalize(log.category)} ${capitalize(log.action)} By ${log.actorUsername}`;
    const updatedFields = log.metadata?.keys?.join(', ') || 'None';

    const displayMetadata = { ...log.metadata };
    if (displayMetadata.keys) {
        delete displayMetadata.keys;
    }

    const breadcrumbs = [
        { label: "Audit Log", href: "/dashboard/settings/audit-logs" },
        { label: title }
    ];

    // وظيفة تأكيد المسح
    const handleConfirmDelete = () => {
        mutate(log.id, {
            onSettled: () => setOpenDelete(false)
        });
    };

    return (
        <div className="flex flex-col w-full min-h-screen bg-[#F8F9FA]">
            <PageHeader breadcrumbs={breadcrumbs}>
                <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-semibold text-black font-inter">{title}</h1>
                        <div className="flex items-center gap-1 text-sm text-gray-400 font-medium">
                            <span>Entity:</span>
                            <span className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                                {capitalize(log.category)} [{log.entityId}]
                                <ExternalLink size={14} />
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={() => setOpenDelete(true)}
                        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 px-5 h-10 transition-all"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span className="font-medium">Delete</span>
                    </Button>
                </div>
            </PageHeader>

            <div className="p-6">
                <div className="bg-white max-w-7xl mx-auto p-4 flex flex-col gap-10 space-y-2">
                    <section>
                        <h3 className="text-sm font-normal text-gray-400">Action</h3>
                        <p className={`font-bold text-sm ${getActionColor(log.action)}`}>
                            {log.action}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-sm font-normal text-gray-400">Method</h3>
                        <p className="text-gray-800 font-normal text-sm uppercase">
                            {log.httpMethod}
                        </p>
                    </section>

                    <section>
                        <h3 className="text-sm font-normal text-gray-400">User</h3>
                        <div className="flex flex-col gap-1.5">
                            <p className="text-gray-800 font-normal text-sm">{log.actorUsername}</p>
                            <div className="text-sm font-normal text-gray-400 ">
                                <p>Email: {log.actorEmail}</p>
                                <p>IP Address: {log.ipAddress}</p>
                                <p>Role:
                                    <span className={`ml-1 font-bold ${log.actorRole === 'SUPER_ADMIN' ? 'text-red-600' : 'text-blue-600'}`}>
                                        {log.actorRole?.replace('_', ' ')}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-normal text-gray-400">Entity</h3>
                        <div className="flex items-center gap-2 text-gray-800 font-normal text-sm ">
                            <span className="capitalize">{log.category}:</span>
                            <span>{log.entityId}</span>
                            <ExternalLink className="w-4 h-4 text-gray-800 cursor-pointer hover:text-blue-600 transition-colors" />
                        </div>
                    </section>

                    <section>
                        <h3 className="text-sm font-normal text-gray-400">Date & Time</h3>
                        <p className="text-gray-800 text-sm font-normal">
                            {formatDateTime(log.createdAt)}
                        </p>
                    </section>

                    {log.action === 'UPDATE' && (
                        <section>
                            <h3 className="text-sm font-normal text-gray-400">Updated Fields</h3>
                            <p className="text-gray-800 text-sm font-normal">
                                {updatedFields}
                            </p>
                        </section>
                    )}

                    {Object.keys(displayMetadata).length > 0 && (
                        <section>
                            <h3 className="text-sm font-normal text-gray-400">Metadata</h3>
                            <div className="bg-gray-200 p-2.5">
                                <pre className="text-sm font-normal text-gray-800">
                                    {JSON.stringify(displayMetadata, null, 2)
                                        .replace(/^{/, '')
                                        .replace(/}$/, '')
                                        .trim()
                                    }
                                </pre>
                            </div>
                        </section>
                    )}
                </div>
            </div>

            {/* المودال الجلوبال للمسح */}
            <GlobalDeleteModal
                isOpen={openDelete}
                onClose={() => setOpenDelete(false)}
                onConfirm={handleConfirmDelete}
                isLoading={isPending}
                title="Delete Audit Log"
                description={`Are you sure you want to delete log #${log.id}? This action cannot be undone.`}
            />
        </div>
    );
}