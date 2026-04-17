import React from 'react'
import Providers from '@/shared/providers/sub-providers/queryProvider';
import DashboardSidebar from './_components/DashboardSideBar';

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    return (
        <div className="flex min-h-screen ">
            <aside className="w-90.5 h-screen sticky bg-gray-800 top-0 overflow-y-auto shrink-0">
                <DashboardSidebar />
            </aside>
            <main className="flex-1 min-w-0 overflow-x-hidden flex flex-col bg-gray-50 p-4">
                <Providers>
                    {children}
                </Providers>
            </main>
        </div>
    );
}
