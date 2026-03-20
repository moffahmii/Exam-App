import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeaderProps {
    title: string;
    icon: LucideIcon;
}

export default function DashboardHeader({ title, icon: Icon }: HeaderProps) {
    return (
        <header className='bg-blue-600 m-4 p-2'>
            <h1 className='font-inter font-semibold text-white text-3xl inline-flex items-center gap-2'>
                <Icon size={45} />
                <span>{title}</span>
            </h1>
        </header>
    );
}