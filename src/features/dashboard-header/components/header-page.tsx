"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    actions?: ReactNode;
    breadcrumbs?: ReactNode;
}

export function PageHeader({
    title,
    actions,
    breadcrumbs,
}: PageHeaderProps) {
    return (
        <div className="w-full">
            {/* Bottom Section */}
            <div className="bg-white border-t border-gray-200">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <div className="px-6 py-2 text-sm text-gray-500 border-b">
                        {breadcrumbs}
                    </div>
                )}
                {/* Title + Actions */}
                <div className="px-6 py-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {title}
                    </h2>
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            </div>
        </div>
    );
}