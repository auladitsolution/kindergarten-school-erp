"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Users,
  GraduationCap,
  CalendarCheck,
  DollarSign,
  UserPlus,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Calendar,
  Bell,
  CheckCircle2,
  Clock,
  Heart,
  PlusCircle,
  FileText,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardOverviewPage() {
  const { user } = useAuth();
  const { isBn, locale } = useLanguage();

  // Dashboard Metrics
  const metrics = [
    {
      title: isBn ? "মোট শিক্ষার্থী" : "Total Students",
      value: isBn ? "৩৫০ জন" : "350 Students",
      subtitle: isBn ? "৪টি শ্রেণি, ৭টি সেকশন" : "4 Classes, 7 Sections",
      icon: Users,
      color: "bg-purple-100 text-purple-700",
      change: "+12% this month",
    },
    {
      title: isBn ? "আজকের উপস্থিতি" : "Today's Attendance",
      value: "96.4%",
      subtitle: isBn ? "৩৩৭ জন উপস্থিত, ১৩ জন ছুটি" : "337 Present, 13 Excused",
      icon: CalendarCheck,
      color: "bg-emerald-100 text-emerald-700",
      change: "On target",
    },
    {
      title: isBn ? "চলতি মাসের ফি আদায়" : "Monthly Fee Collected",
      value: formatCurrency(485000, locale),
      subtitle: isBn ? "বকেয়া: " + formatCurrency(38500, locale) : "Outstanding: " + formatCurrency(38500, locale),
      icon: DollarSign,
      color: "bg-sky-100 text-sky-700",
      change: "+8% vs last month",
    },
    {
      title: isBn ? "নতুন ভর্তি আবেদন" : "Pending Admissions",
      value: isBn ? "৫টি আবেদন" : "5 Applications",
      subtitle: isBn ? "পর্যালোচনার অপেক্ষায়" : "Awaiting review",
      icon: UserPlus,
      color: "bg-amber-100 text-amber-700",
      change: "3 Approved today",
    },
  ];

  // Chart Data: Attendance by Class
  const attendanceData = [
    { name: isBn ? "প্লে গ্রুপ" : "Play", present: 98, absent: 2 },
    { name: isBn ? "নার্সারি" : "Nursery", present: 95, absent: 5 },
    { name: isBn ? "কেজি" : "KG", present: 97, absent: 3 },
    { name: isBn ? "১ম শ্রেণি" : "Class 1", present: 96, absent: 4 },
  ];

  // Chart Data: Fee Collection Trend (Thousands BDT)
  const feeTrendData = [
    { month: "Jun", amount: 390 },
    { month: "Jul", amount: 410 },
    { month: "Aug", amount: 440 },
    { month: "Sep", amount: 460 },
    { month: "Oct", amount: 485 },
  ];

  // Recent Online Applications
  const recentAdmissions = [
    {
      ref: "ADM-2026-001",
      name: isBn ? "তাহমিদ রহমান" : "Tahmid Rahman",
      class: "Play Group",
      status: "under_review",
      time: isBn ? "আজ দুপুর ২:৩০" : "Today, 2:30 PM",
    },
    {
      ref: "ADM-2026-002",
      name: isBn ? "মেহবিশ আলম" : "Mehvish Alam",
      class: "Nursery",
      status: "approved",
      time: isBn ? "গতকাল" : "Yesterday",
    },
    {
      ref: "ADM-2026-003",
      name: isBn ? "জায়ান আহমেদ" : "Zayan Ahmed",
      class: "KG",
      status: "submitted",
      time: isBn ? "২ দিন আগে" : "2 days ago",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Greeting Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-amber-200">
            <Sparkles className="w-3.5 h-3.5" />
            {isBn ? "স্মার্ট স্কুল ম্যানেজমেন্ট সিস্টেম" : "Live Integrated ERP Engine"}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black">
            {isBn ? `স্বাগতম, ${user?.name || "এডমিনিস্ট্রেটর"}!` : `Welcome Back, ${user?.name || "Administrator"}!`}
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm">
            {isBn
              ? "ক্যাম্পাসের সকল কার্যক্রম স্বাভাবিক রয়েছে। আজকের গুরুত্বপূর্ণ আপডেটগুলো নিচে দেখুন।"
              : "All systems running smoothly. Monitor real-time school operations and quick actions below."}
          </p>
        </div>

        {/* Quick actions buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Link href="/dashboard/students">
            <Button variant="yellow" size="sm" className="font-extrabold shadow-sm gap-1.5">
              <PlusCircle className="w-4 h-4" />
              <span>{isBn ? "নতুন শিক্ষার্থী" : "Add Student"}</span>
            </Button>
          </Link>
          <Link href="/dashboard/attendance">
            <Button variant="sky" size="sm" className="font-extrabold shadow-sm gap-1.5">
              <CalendarCheck className="w-4 h-4" />
              <span>{isBn ? "হাজিরা গ্রহণ" : "Mark Attendance"}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <Card key={idx} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{m.title}</span>
                <div className={`w-10 h-10 rounded-xl ${m.color} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-2xl font-black text-slate-900">{m.value}</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">{m.subtitle}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Attendance by Class */}
        <Card className="lg:col-span-7 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base font-extrabold text-slate-900">
                {isBn ? "শ্রেণিভিত্তিক আজকের উপস্থিতি (%)" : "Class-wise Today's Attendance (%)"}
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? "প্লে, নার্সারি, কেজি ও ১ম শ্রেণির অনুপাত" : "Real-time presence tracking"}
              </p>
            </div>
            <Badge variant="green">{isBn ? "৯৬.৪% গড় উপস্থিতি" : "96.4% Average"}</Badge>
          </div>

          <div className="h-64 w-full pt-2 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis domain={[80, 100]} tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                />
                <Bar dataKey="present" fill="#7C3AED" radius={[8, 8, 0, 0]} name={isBn ? "উপস্থিত (%)" : "Present (%)"} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Fee Collection Monthly Trend */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-base font-extrabold text-slate-900">
                {isBn ? "ফি আদায় প্রবৃদ্ধি (হাজার টাকায়)" : "Fee Collection Trend ('000 BDT)"}
              </CardTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                {isBn ? "গত ৫ মাসের আদায় রেখা" : "Last 5 months revenue growth"}
              </p>
            </div>
            <Badge variant="sky">+8.2%</Badge>
          </div>

          <div className="h-64 w-full pt-2 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={feeTrendData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <YAxis domain={[300, 520]} tick={{ fontSize: 12, fill: "#64748B" }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(val: any) => [`৳${val * 1000}`, isBn ? "ফি আদায়" : "Collected"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0" }}
                />
                <Area type="monotone" dataKey="amount" stroke="#0EA5E9" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 3: Pending Admissions & Quick Operational Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Admissions Review */}
        <Card className="lg:col-span-7 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4 min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2.5">
              <UserPlus className="w-5 h-5 text-purple-600" />
              <div>
                <CardTitle className="text-base font-extrabold text-slate-900">
                  {isBn ? "সাম্প্রতিক অনলাইন ভর্তি আবেদন" : "Recent Admission Applications"}
                </CardTitle>
                <p className="text-xs text-slate-500">
                  {isBn ? "যাচাই ও শ্রেণি অন্তর্ভুক্তির অপেক্ষায়" : "Pending desk review"}
                </p>
              </div>
            </div>
            <Link href="/dashboard/admissions">
              <Button variant="ghost" size="sm" className="text-xs font-bold text-purple-700">
                {isBn ? "সকল আবেদন দেখুন →" : "View All →"}
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            {recentAdmissions.map((adm, i) => (
              <div
                key={i}
                className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-purple-50/50 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-sm">{adm.name}</span>
                    <Badge variant="outline" className="text-[10px] py-0">{adm.class}</Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{adm.ref} • {adm.time}</p>
                </div>

                <div className="flex items-center gap-2">
                  {adm.status === "approved" ? (
                    <Badge variant="green" className="text-xs">{isBn ? "অনুমোদিত" : "Approved"}</Badge>
                  ) : adm.status === "under_review" ? (
                    <Badge variant="yellow" className="text-xs">{isBn ? "বিবেচনাধীন" : "Under Review"}</Badge>
                  ) : (
                    <Badge variant="sky" className="text-xs">{isBn ? "গৃহীত" : "Submitted"}</Badge>
                  )}
                  <Link href="/dashboard/admissions">
                    <Button variant="outline" size="sm" className="h-8 text-xs font-bold px-2.5">
                      {isBn ? "রিভিউ" : "Review"}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick ERP Shortcuts */}
        <Card className="lg:col-span-5 p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-4">
            <CardTitle className="text-base font-extrabold text-slate-900">
              {isBn ? "দ্রুত কার্যক্রম (Quick Actions)" : "Quick ERP Shortcuts"}
            </CardTitle>
            <p className="text-xs text-slate-500 mt-0.5">
              {isBn ? "এক ক্লিকে গুরুত্বপূর্ণ মডিউলে যান" : "Frequently used daily routines"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/students"
              className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 hover:bg-purple-100/70 transition-all text-center space-y-1.5"
            >
              <Users className="w-5 h-5 text-purple-700 mx-auto" />
              <p className="font-extrabold text-xs text-purple-900">{isBn ? "শিক্ষার্থী তালিকা" : "Student List"}</p>
            </Link>

            <Link
              href="/dashboard/attendance"
              className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 hover:bg-emerald-100/70 transition-all text-center space-y-1.5"
            >
              <CalendarCheck className="w-5 h-5 text-emerald-700 mx-auto" />
              <p className="font-extrabold text-xs text-emerald-900">{isBn ? "দৈনিক হাজিরা" : "Take Attendance"}</p>
            </Link>

            <Link
              href="/dashboard/fees"
              className="p-3.5 rounded-2xl bg-sky-50 border border-sky-100 hover:bg-sky-100/70 transition-all text-center space-y-1.5"
            >
              <DollarSign className="w-5 h-5 text-sky-700 mx-auto" />
              <p className="font-extrabold text-xs text-sky-900">{isBn ? "বেতন ও ইনভয়েস" : "Fees & Receipts"}</p>
            </Link>

            <Link
              href="/dashboard/examinations"
              className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 hover:bg-rose-100/70 transition-all text-center space-y-1.5"
            >
              <FileText className="w-5 h-5 text-rose-700 mx-auto" />
              <p className="font-extrabold text-xs text-rose-900">{isBn ? "রিপোর্ট কার্ড" : "Report Cards"}</p>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
