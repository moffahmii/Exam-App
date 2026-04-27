import React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/shared/components/ui/sidebar";
import DashLogoSection from "./dash-logo-section";
import UserDropdown from "@/features/side-bar/components/user-details";
import DashboardSidebarnavLinks from "./nav-links";

export default function DashboardSideBar() {
    return (
        <aside className="bg-gray-800 w-90.5 h-screen sticky top-0 flex flex-col justify-between">
            <div>
                <DashLogoSection />
                <DashboardSidebarnavLinks />
            </div>
            <UserDropdown />
        </aside>

    );
}