import React from 'react'
import AccountSideBar from '../_components/accountSideBar';

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {

    return (
        <div className="grid lg:grid-cols-12 flex-1 gap-6  bg-gray-50">
            <aside className="lg:col-span-3 ">
                <AccountSideBar />
            </aside>
            <main className="lg:col-span-9">
                {children}
            </main>
        </div>
    )
}
