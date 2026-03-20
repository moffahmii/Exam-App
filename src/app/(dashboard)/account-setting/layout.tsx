import React from 'react'
import Breadcrumbs from '../_components/Breadcrumbs';
import DashboardHeader from '../_components/dashboardHeader';
import AccountSideBar from '../_components/accountSideBar';

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {

    return (
        <div className="grid lg:grid-cols-12 flex-1 gap-6  bg-gray-50">
            <aside className="lg:col-span-2 ">
                <AccountSideBar />
            </aside>
            <main className="lg:col-span-10">
                {children}
            </main>
        </div>
    )
}
