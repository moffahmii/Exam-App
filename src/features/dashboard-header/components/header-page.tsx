"use client";
import { Children, ReactNode } from "react";
interface PageHeaderProps {
    actions?: ReactNode;
    Children?: ReactNode;
    breadcrumbs?: ReactNode;
}

export function PageHeader({ actions, breadcrumbs, Children }: PageHeaderProps) {
    return (
        <div className="w-full bg-white">
            {/* Bottom Section */}
            <div className="bg-red-700 border-t border-gray-200">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <div className="px-6 py-2 text-sm text-gray-500 border-b">
                        {breadcrumbs}
                    </div>
                )}
                {/* Title + Actions */}
                <div className="px-6 py-3 flex items-center justify-between">
                    {Children}
                    {actions && <div className="flex items-center gap-2">{actions}</div>}
                </div>
            </div>
        </div>
    );
}