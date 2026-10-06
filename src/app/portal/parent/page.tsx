"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import {
  Heart,
  CalendarCheck,
  Award,
  DollarSign,
  FileText,
  Bell,
  Printer,
  Sparkles,
  Baby,
  Smile,
  LogOut,
} from "lucide-react";
import { toast } from "sonner";

export default function ParentPortalPage() {
  const { user, logout } = useAuth();
  const { isBn, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"overview" | "fees" | "results" | "notices">("overview");

  // Child Info (Rayan Islam)
  const child = {
    name: "Rayan Islam",
    nameBn: "রায়ান ইসলাম",
    studentId: "KGS-2026-0001",
    class: "Play Group (Rose)",
    roll: 1,
    attendanceRate: 98,
    bloodGroup: "B+",
    photo: "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=400",
  };

  const dues = 0; // All paid for Rayan

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-rose-500 via-purple-600 to-sky-500 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <img
                src={child.photo}
                alt={child.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-white shadow-md shrink-0"
              />
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-amber-200">
                  {isBn ? "অভিভাবক পোর্টাল" : "Parent Portal"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black mt-1">{child.name}</h1>
                <p className="text-xs sm:text-sm text-purple-100 font-semibold">
                  {child.class} • Roll: #{child.roll} • ID: {child.studentId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/students">
                <Button variant="yellow" size="sm" className="font-extrabold gap-1.5 shadow-sm">
                  <Printer className="w-4 h-4" />
                  <span>{isBn ? "আইডি কার্ড" : "ID Card"}</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/50 text-white hover:bg-white hover:text-purple-700 font-bold"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                <span>{isBn ? "লগআউট" : "Sign Out"}</span>
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm text-center">
              <CalendarCheck className="w-6 h-6 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-500 mt-2">{isBn ? "হাজিরা হার" : "Attendance"}</p>
              <p className="text-xl font-black text-slate-900 mt-0.5">{child.attendanceRate}%</p>
            </Card>

            <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm text-center">
              <Award className="w-6 h-6 text-purple-600 mx-auto" />
              <p className="text-xs font-bold text-slate-500 mt-2">{isBn ? "সর্বশেষ গ্রেড" : "Last Grade"}</p>
              <p className="text-xl font-black text-slate-900 mt-0.5">A+ (Star)</p>
            </Card>

            <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm text-center">
              <DollarSign className="w-6 h-6 text-sky-600 mx-auto" />
              <p className="text-xs font-bold text-slate-500 mt-2">{isBn ? "বেতন বকেয়া" : "Due Balance"}</p>
              <p className="text-xl font-black text-emerald-600 mt-0.5">{formatCurrency(dues, locale)}</p>
            </Card>

            <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm text-center">
              <Smile className="w-6 h-6 text-amber-500 mx-auto" />
              <p className="text-xs font-bold text-slate-500 mt-2">{isBn ? "রক্তের গ্রুপ" : "Blood Group"}</p>
              <p className="text-xl font-black text-slate-900 mt-0.5">{child.bloodGroup}</p>
            </Card>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-purple-100 gap-2">
            {[
              { id: "overview", label: isBn ? "আজকের আপডেট" : "Daily Updates" },
              { id: "fees", label: isBn ? "বেতন ও ইনভয়েস" : "Fees & Invoices" },
              { id: "results", label: isBn ? "প্রগ্রেস রিপোর্ট" : "Progress Report" },
              { id: "notices", label: isBn ? "নোটিশ" : "Notices" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 font-bold text-xs sm:text-sm border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-700 bg-purple-50/50 rounded-t-xl"
                    : "border-transparent text-slate-500 hover:text-purple-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB CONTENT 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isBn ? "আজকের ক্লাসরুম কার্যক্রম" : "Today's Learning Activities"}
                  </h3>
                  <Badge variant="purple">Play Group</Badge>
                </div>
                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1 shrink-0"></span>
                    <span><strong>Phonics:</strong> Letter sound 'B' recognition & balloon pop game.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1 shrink-0"></span>
                    <span><strong>Clay Fun:</strong> Rolling clay balls and molding miniature apples.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1 shrink-0"></span>
                    <span><strong>Nutrition Snack:</strong> Seasonal fresh banana and milk biscuit.</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 rounded-3xl border border-sky-100 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isBn ? "শ্রেণি শিক্ষকের মন্তব্য" : "Teacher's Daily Remark"}
                  </h3>
                  <span className="text-xs text-slate-400 font-semibold">Today, 1:45 PM</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "Rayan enthusiastically participated in the circle song and helped his friend clean up the play blocks. Wonderful behavior!"
                </p>
                <div className="pt-2 border-t border-slate-100 text-xs font-bold text-purple-700">
                  — Nusrat Jahan (Lead Teacher)
                </div>
              </Card>
            </div>
          )}

          {/* TAB CONTENT 2: FEES */}
          {activeTab === "fees" && (
            <Card className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                {isBn ? "বেতন পরিশোধ বিবরণী" : "Fee Invoices & Digital Receipts"}
              </h3>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-mono font-bold text-xs text-purple-700">INV-2026-0001</span>
                  <p className="font-extrabold text-slate-900 text-sm mt-0.5">October 2026 Tuition & Activity</p>
                  <p className="text-xs text-slate-500">Paid: ৳5,500 via bKash • Balance: ৳0</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="green">Paid</Badge>
                  <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 text-xs">
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isBn ? "রসিদ প্রিন্ট" : "Print Receipt"}</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* TAB CONTENT 3: RESULTS */}
          {activeTab === "results" && (
            <Card className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-slate-900 text-base">
                  {isBn ? "প্রথম সাময়িক মূল্যায়ন কার্ড" : "First Term Evaluation 2026"}
                </h3>
                <Badge variant="purple">A+ (Star Performer)</Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">English Phonics</span>
                  <span className="font-black text-purple-700 text-base">95 / 100</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Colors & Shapes</span>
                  <span className="font-black text-purple-700 text-base">92 / 100</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">Art & Sensory</span>
                  <span className="font-black text-purple-700 text-base">98 / 100</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 block">General Nature</span>
                  <span className="font-black text-purple-700 text-base">90 / 100</span>
                </div>
              </div>

              <div className="pt-2 text-right">
                <Button variant="outline" size="sm" onClick={() => window.print()} className="gap-1.5 text-xs">
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isBn ? "পূর্ণাঙ্গ রিপোর্ট কার্ড প্রিন্ট" : "Print Full Report Card"}</span>
                </Button>
              </div>
            </Card>
          )}

          {/* TAB CONTENT 4: NOTICES */}
          {activeTab === "notices" && (
            <div className="space-y-4">
              <Card className="p-5 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-2">
                <Badge variant="yellow" className="self-start">⭐ Important</Badge>
                <h4 className="font-black text-slate-900 text-base">Autumn Joy Fest & Color Day Next Thursday</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Please dress children in colorful clothing. The celebration begins at 9:30 AM.
                </p>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
