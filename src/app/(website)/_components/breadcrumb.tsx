'use client'
import { useBreadcrumbs } from "../_hooks/use-breadcrumb"
type BreadcrumbItem = {
    label: string
    href?: string
}

export function Breadcrumb({ items }: { items?: BreadcrumbItem[] }) {
    const breadcrumbs = useBreadcrumbs(items)
    return (
        <div className="flex gap-2 text-sm">
            {breadcrumbs.map((item, i) => (
                <span key={i}>
                    {i > 0 && ' / '}
                    {item.href ? (
                        <a href={item.href}>{item.label}</a>
                    ) : (
                        <span>{item.label}</span>
                    )}
                </span>
            ))}
        </div>
    )
}