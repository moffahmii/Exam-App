import React from "react";
import LogoSection from "./logo-section";
import UserDropdown from "./user-details";
import SidebarnavLinks from "../../account-settings/components/sidebar-nav-links";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
} from "@/shared/components/ui/sidebar";

export default function AppSideBar() {
    return (
        <Sidebar className="">
            <SidebarHeader className="p-0">
                <LogoSection />
            </SidebarHeader>
            <SidebarContent>
                <SidebarnavLinks />
            </SidebarContent>
            <SidebarFooter className="p-0">
                <UserDropdown />
            </SidebarFooter>
        </Sidebar>
    );
}