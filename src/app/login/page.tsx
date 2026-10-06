"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  LogIn,
  ShieldCheck,
  UserCheck,
  GraduationCap,
  Sparkles,
  Users,
  Briefcase,
  DollarSign,
  Heart,
  KeyRound,
} from "lucide-react";
import { toast } from "sonner";
import { UserRole } from "@/types";

export default function LoginPage() {
  const { loginAsDemo, loading } = useAuth();
  const { isBn } = useLanguage();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDemoLogin = async (role: UserRole) => {
    toast.loading(isBn ? "প্রবেশ করা হচ্ছে..." : "Logging in...", { id: "login-toast" });
    await loginAsDemo(role);
    toast.success(isBn ? "সফলভাবে লগইন হয়েছে!" : "Successfully logged in!", { id: "login-toast" });
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter email");
      return;
    }
    // For standard demonstration, log in as school admin if email contains admin, else parent
    const role: UserRole = email.includes("teacher")
      ? "teacher"
      : email.includes("parent")
      ? "parent"
      : email.includes("account")
      ? "accountant"
      : "school_admin";
    handleDemoLogin(role);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <SectionBadge text={isBn ? "ইন্টিগ্রেটেড স্কুল ইআরপি" : "Unified School ERP Portal"} color="purple" />
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
              {isBn ? "নিরাপদ লগইন ও ভূমিকা পোর্টাল" : "Secure Authentication Portal"}
            </h1>
            <p className="text-slate-600 text-sm">
              {isBn
                ? "প্রশাসক, শিক্ষক, হিসাবরক্ষক ও অভিভাবকগণের জন্য সেন্ট্রালাইজড এক্সেস।"
                : "Role-based access for Administrators, Teachers, Accountants & Parents."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Standard Login Box */}
            <div className="md:col-span-6 space-y-6">
              <Card className="p-8 rounded-3xl border border-purple-100 bg-white shadow-xl space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                    <LogIn className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {isBn ? "অ্যাকাউন্টে প্রবেশ করুন" : "Account Sign In"}
                    </h3>
                    <p className="text-xs text-slate-500">Firebase Auth & Session Engine</p>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleDemoLogin("school_admin")}
                  disabled={loading}
                  className="w-full h-12 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>{isBn ? "গুগল দিয়ে প্রবেশ করুন" : "Continue with Google"}</span>
                </Button>

                <div className="relative flex items-center justify-center">
                  <div className="border-t border-slate-200 w-full"></div>
                  <span className="bg-white px-3 text-xs font-bold text-slate-400 uppercase">
                    {isBn ? "অথবা ইমেইল" : "or email"}
                  </span>
                </div>

                <form onSubmit={handleStandardLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? "ইমেইল এড্রেস" : "Email Address"}
                    </label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@bloomkindergarten.edu.bd"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isBn ? "পাসওয়ার্ড" : "Password"}
                    </label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="default"
                    disabled={loading}
                    className="w-full h-12 bg-purple-600 hover:bg-purple-700 text-white font-extrabold shadow-md shadow-purple-200"
                  >
                    <KeyRound className="w-4 h-4 mr-2" />
                    <span>{isBn ? "লগইন করুন" : "Sign In to ERP"}</span>
                  </Button>
                </form>

                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <span>
                    {isBn
                      ? "নিরাপত্তা নীতি: নতুন নিবন্ধিত অ্যাকাউন্ট ডিফল্টভাবে 'pending' থাকে। অনুমোদিত প্রশাসক কর্তৃক অ্যাক্টিভ হওয়ার পরেই প্রবেশ সম্ভব।"
                      : "Security Policy: Newly created Google accounts receive a restricted 'pending' status until verified by school administrators."}
                  </span>
                </div>
              </Card>
            </div>

            {/* Instant Demo Role Switcher */}
            <div className="md:col-span-6 space-y-4">
              <Card className="p-6 sm:p-8 rounded-3xl border-2 border-dashed border-purple-200 bg-white/90 shadow-md space-y-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-lg font-black text-slate-900">
                      {isBn ? "তাৎক্ষণিক ডেমো রোল নির্বাচন (Instant Switch)" : "Instant Demo Role Switcher"}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {isBn
                      ? "যে কোনো রোলে এক ক্লিকে প্রবেশ করে সম্পূর্ণ সিস্টেম যাচাই করুন:"
                      : "Click any profile below to explore with realistic role-based permissions:"}
                  </p>
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      role: "super_admin" as UserRole,
                      title: isBn ? "সুপার এডমিন (Super Admin)" : "Super Administrator",
                      desc: isBn ? "পূর্ণ নিয়ন্ত্রণ, সেটিংস ও অডিট লগ" : "Full ERP control & school settings",
                      icon: ShieldCheck,
                      color: "bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200",
                    },
                    {
                      role: "school_admin" as UserRole,
                      title: isBn ? "স্কুল এডমিন (School Admin)" : "School Administrator",
                      desc: isBn ? "শিক্ষার্থী, ভর্তি ও একাডেমিক ম্যানেজমেন্ট" : "Students, Admissions & Academics",
                      icon: Briefcase,
                      color: "bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200",
                    },
                    {
                      role: "teacher" as UserRole,
                      title: isBn ? "শিক্ষক (Class Teacher - Nursery)" : "Class Teacher (Nursery)",
                      desc: isBn ? "উপস্থিতি গ্রহণ, পরীক্ষা ও রেজাল্ট" : "Attendance entry & progress cards",
                      icon: GraduationCap,
                      color: "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200",
                    },
                    {
                      role: "accountant" as UserRole,
                      title: isBn ? "হিসাবরক্ষক (Accountant)" : "School Accountant",
                      desc: isBn ? "ফি ইনভয়েস, বিকাশ/ক্যাশ ও খরচ" : "Invoices, Cash/bKash receipts, Dues",
                      icon: DollarSign,
                      color: "bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200",
                    },
                    {
                      role: "parent" as UserRole,
                      title: isBn ? "অভিভাবক (Parent of Rayan)" : "Parent Portal (Rayan's Parent)",
                      desc: isBn ? "সন্তানের উপস্থিতি, বেতন ও রেজাল্ট" : "Child progress, dues & report card",
                      icon: Heart,
                      color: "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200",
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => handleDemoLogin(item.role)}
                        disabled={loading}
                        className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${item.color}`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 shrink-0" />
                          <div>
                            <p className="font-extrabold text-sm">{item.title}</p>
                            <p className="text-[11px] opacity-80">{item.desc}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold underline">
                          {isBn ? "প্রবেশ →" : "Enter →"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
