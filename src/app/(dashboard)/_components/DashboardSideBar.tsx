import React from 'react'
import { LogoWhite } from './LogoWhite'
import SidebarnavLinks from '@/features/account-settings/components/sidebar-nav-links'
import SidebarNavLinksDashboard from './SideBarNavLinks'

export default function DashboardSideBar() {
    return (
        <div className="flex flex-col justify-between h-full bg-gray-800 text-white">
            {/* Logo */}
            <div>
                <LogoWhite />
                {/* Navigation */}
                <SidebarNavLinksDashboard />
            </div>
            {/* User */}
            <h1>User</h1>
        </div>
    )
}