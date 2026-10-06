"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import {
  Bell,
  Search,
  GraduationCap,
  Menu,
  ExternalLink,
} from "lucide-react";

interface TopNavbarProps {
  onToggleSidebar?: () => void;
}

export function TopNavbar({ onToggleSidebar }: TopNavbarProps) {
  const { user } = useAuth();
  const { isBn } = useLanguage();

  return (
    <header className="h-16 lg:h-20 bg-white border-b border-purple-100/70 px-3 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs max-w-full">
      {/* Mobile Menu & Brand Trigger */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5 text-slate-700" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-sky-400 text-white flex items-center justify-center font-bold shadow-xs">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-slate-900 text-sm">
            {isBn ? "ব্লুম ইআরপি" : "Bloom ERP"}
          </span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative w-72 sm:w-80 hidden md:block">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder={isBn ? "শিক্ষার্থী, রোল বা ইনভয়েস খুঁজুন..." : "Search student, ID, invoice..."}
          className="w-full h-10 pl-10 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-purple-200 focus:bg-white transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">
        {/* Quick link to public website */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:text-purple-600 hover:bg-slate-50 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>{isBn ? "ওয়েবসাইট দেখুন" : "View Website"}</span>
        </Link>

        <LanguageToggle />

        {/* Notifications Icon with indicator */}
        <Link
          href="/dashboard/notices"
          className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors shrink-0"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500"></span>
        </Link>

        {/* User Avatar badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs shrink-0">
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-extrabold text-slate-900 leading-none truncate max-w-[140px]">
              {user?.name || "Administrator"}
            </p>
            <span className="text-[10px] font-bold text-emerald-600 inline-block mt-0.5">
              ● Active
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
