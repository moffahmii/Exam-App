'use client'
import { usePathname } from 'next/navigation'
type BreadcrumbItem = {
    label: string
    href?: string
}

export function useBreadcrumbs(custom?: BreadcrumbItem[]) {
    const pathname = usePathname()

    if (custom) return custom

    const segments = pathname.split('/').filter(Boolean)

    return segments.map((segment, index) => ({
        label: segment,
        href: '/' + segments.slice(0, index + 1).join('/'),
    }))
}