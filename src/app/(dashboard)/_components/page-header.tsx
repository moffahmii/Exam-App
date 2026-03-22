"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Breadcrumb = {
    label: string;
    href?: string;
};

type Props = {
    title: string;
    icon?: React.ReactNode;
    breadcrumbs?: Breadcrumb[];
    isLoading?: boolean;
};

export function PageHeader({
    title,
    icon,
    breadcrumbs,
    isLoading,
}: Props) {
    const router = useRouter();

    return (
        <div className="border-b bg-white">
            {/* ================= HEADER ================= */}
            <div className="flex items-center gap-4 px-6 py-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded border hover:bg-gray-100"
                >
                    <ArrowLeft size={18} />
                </button>

                {icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-gray-50">
                        {icon}
                    </div>
                )}

                <div>
                    {isLoading ? (
                        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse" />
                    ) : (
                        <h1 className="text-xl font-semibold">{title}</h1>
                    )}
                </div>
            </div>

            {/* ================= BREADCRUMB ================= */}
            {breadcrumbs && breadcrumbs.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 px-6 pb-4">
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <div key={index} className="flex items-center gap-2">
                                {item.href && !isLast ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-black transition"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-black font-medium">
                                        {isLoading && isLast ? "..." : item.label}
                                    </span>
                                )}

                                {!isLast && <span>/</span>}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}