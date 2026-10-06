"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CalendarCheck,
  Award,
  DollarSign,
  UserPlus,
  BookOpen,
  Bell,
  Globe,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Heart,
  Menu,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export function DashboardSidebar({
  mobileOpen: controlledMobileOpen,
  setMobileOpen: controlledSetMobileOpen,
}: DashboardSidebarProps = {}) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { isBn } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [localMobileOpen, setLocalMobileOpen] = useState(false);

  const isMobileOpen = controlledMobileOpen !== undefined ? controlledMobileOpen : localMobileOpen;
  const setIsMobileOpen = controlledSetMobileOpen || setLocalMobileOpen;

  const menuItems = [
    {
      href: "/dashboard",
      label: isBn ? "ড্যাশবোর্ড ওভারভিউ" : "Dashboard Overview",
      icon: LayoutDashboard,
      roles: ["super_admin", "school_admin", "principal", "accountant", "teacher"],
    },
    {
      href: "/dashboard/admissions",
      label: isBn ? "অনলাইন ভর্তি আবেদন" : "Admission Applications",
      icon: UserPlus,
      roles: ["super_admin", "school_admin", "principal"],
      badge: "New",
    },
    {
      href: "/dashboard/students",
      label: isBn ? "শিক্ষার্থী ব্যবস্থাপনা" : "Student Management",
      icon: Users,
      roles: ["super_admin", "school_admin", "principal", "teacher"],
    },
    {
      href: "/dashboard/teachers",
      label: isBn ? "শিক্ষক ও কর্মকর্তা" : "Teachers & Staff",
      icon: GraduationCap,
      roles: ["super_admin", "school_admin", "principal"],
    },
    {
      href: "/dashboard/academics",
      label: isBn ? "শ্রেণি ও কারিকুলাম" : "Classes & Subjects",
      icon: BookOpen,
      roles: ["super_admin", "school_admin", "principal"],
    },
    {
      href: "/dashboard/attendance",
      label: isBn ? "দৈনিক হাজিরা" : "Daily Attendance",
      icon: CalendarCheck,
      roles: ["super_admin", "school_admin", "principal", "teacher"],
    },
    {
      href: "/dashboard/examinations",
      label: isBn ? "পরীক্ষা ও রিপোর্ট কার্ড" : "Exams & Report Cards",
      icon: Award,
      roles: ["super_admin", "school_admin", "principal", "teacher"],
    },
    {
      href: "/dashboard/fees",
      label: isBn ? "ফি ও হিসাবরক্ষণ" : "Fees & Accounting",
      icon: DollarSign,
      roles: ["super_admin", "school_admin", "principal", "accountant"],
    },
    {
      href: "/dashboard/notices",
      label: isBn ? "বিজ্ঞপ্তি প্রকাশ" : "Publish Notices",
      icon: Bell,
      roles: ["super_admin", "school_admin", "principal", "teacher"],
    },
    {
      href: "/dashboard/cms",
      label: isBn ? "ওয়েবসাইট সিএমএস" : "Website CMS",
      icon: Globe,
      roles: ["super_admin", "school_admin"],
    },
    {
      href: "/dashboard/settings",
      label: isBn ? "স্কুল সেটিংস ও অডিট" : "Settings & Audit",
      icon: Settings,
      roles: ["super_admin", "school_admin"],
    },
  ];

  const userRole = user?.role || "super_admin";
  const visibleItems = menuItems.filter((item) => item.roles.includes(userRole));

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-purple-100/80 transition-all duration-300 flex flex-col justify-between shadow-2xl lg:shadow-xs ${
          collapsed ? "w-20" : "w-64 max-w-[85vw]"
        } ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Top Header */}
        <div>
          <div className="h-16 lg:h-20 flex items-center justify-between px-4 lg:px-5 border-b border-slate-100">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-sky-400 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-200">
                <GraduationCap className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              {!collapsed && (
                <div className="leading-tight truncate">
                  <span className="font-black text-slate-900 text-sm lg:text-base block truncate">
                    {isBn ? "ব্লুম ইআরপি" : "Bloom ERP"}
                  </span>
                  <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider block">
                    {user?.role?.replace("_", " ")}
                  </span>
                </div>
              )}
            </Link>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setCollapsed(!collapsed)}
                className="hidden lg:flex w-7 h-7 rounded-lg bg-slate-100 text-slate-500 hover:bg-purple-100 hover:text-purple-700 items-center justify-center"
              >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                      : "text-slate-600 hover:bg-purple-50 hover:text-purple-700"
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                  {!collapsed && item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Footer info & Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          {!collapsed && (
            <div className="mb-3 px-1">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.name || "Administrator"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email || "admin@bloom.edu.bd"}</p>
            </div>
          )}

          <button
            type="button"
            onClick={logout}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>{isBn ? "লগআউট" : "Sign Out"}</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
