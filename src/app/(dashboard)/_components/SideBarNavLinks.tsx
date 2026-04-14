'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap, BookOpenCheck, User, List } from "lucide-react";

export default function SidebarNavLinksDashboard() {
  const pathname = usePathname();

  const linkStyle = (path: string) => {
    const isActive = pathname.startsWith(path);

    return `
      flex items-center gap-3 px-5 py-4 border transition-all
      ${isActive
        ? "border-slate-400 bg-slate-700 text-white"
        : "border-transparent text-slate-300 hover:bg-slate-700/20"
      }
    `;
  };

  return (
    <div className="w-64  bg-[#1e293b] p-6 font-mono">
      <nav className="flex flex-col gap-3">

        <Link href="/dashboard/diplomas" className={linkStyle("/dashboard/diplomas")}>
          <GraduationCap className="w-5 h-5" />
          <span>Diplomas</span>
        </Link>

        <Link href="/dashboard/exams" className={linkStyle("/dashboard/exams")}>
          <BookOpenCheck className="w-5 h-5" />
          <span>Exams</span>
        </Link>

        <Link href="/dashboard/account-setting" className={linkStyle("/dashboard/account-setting")}>
          <User className="w-5 h-5" />
          <span>Account Settings</span>
        </Link>

        <Link href="/dashboard/audit-log" className={linkStyle("/dashboard/audit-log")}>
          <List className="w-5 h-5" />
          <span>Audit Log</span>
        </Link>

      </nav>
    </div>
  );
}