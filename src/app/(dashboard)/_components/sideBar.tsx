import React from "react";
import LogoSection from "./logo-section";
import UserDropdown from "./user-details";
import SidebarnavLinks from "./sidebar-nav-links";


export default function SideBar() {

    return (
        <div className="flex flex-col justify-between h-full bg-blue-50">
            {/* Logo */}
            <div>
                <LogoSection />
                {/* Navigation */}
                <SidebarnavLinks />
            </div>
            {/* User */}
            <UserDropdown />
        </div>
    );
}