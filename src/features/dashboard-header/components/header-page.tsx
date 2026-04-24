"use client";
import { ReactNode } from "react";

interface PageHeaderProps {
    children?: ReactNode;
    breadcrumbs?: ReactNode;
}

export function PageHeader({ children, breadcrumbs }: PageHeaderProps) {
    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-30">
            <div className="px-6 h-18 flex items-center justify-between">
                {children} {/* تأكد إن السطر ده موجود هنا */}
            </div>
        </header>
    );
}