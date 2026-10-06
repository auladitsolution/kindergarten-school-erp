"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useAuth } from "@/lib/auth/AuthContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  CalendarCheck,
  Award,
  BookOpen,
  PlusCircle,
  Users,
  Send,
  LogOut,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function TeacherPortalPage() {
  const { user, logout } = useAuth();
  const { isBn } = useLanguage();

  const [homeworkList, setHomeworkList] = useState([
    {
      id: "1",
      subject: "English Phonics",
      title: "Letter 'C' coloring and phonics rhyme practice",
      dueDate: "Tomorrow",
    },
    {
      id: "2",
      subject: "Math & Shapes",
      title: "Count objects 1 to 5 with small clay balls",
      dueDate: "Thursday",
    },
  ]);

  const [hwTitle, setHwTitle] = useState("");
  const [hwSubject, setHwSubject] = useState("English Phonics");

  const handleAddHw = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hwTitle) return;
    setHomeworkList([
      ...homeworkList,
      { id: String(Date.now()), subject: hwSubject, title: hwTitle, dueDate: "Tomorrow" },
    ]);
    setHwTitle("");
    toast.success(isBn ? "হোমওয়ার্ক সফলভাবে দেওয়া হয়েছে!" : "Homework assigned to class!");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold shadow-md shrink-0">
                <GraduationCap className="w-10 h-10" />
              </div>
              <div>
                <span className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider text-emerald-100">
                  {isBn ? "শিক্ষক পোর্টাল" : "Teacher Portal"}
                </span>
                <h1 className="text-2xl sm:text-3xl font-black mt-1">
                  {user?.name || "Nusrat Jahan"}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100 font-semibold">
                  Senior Kindergarten Educator • Class Teacher (Play Group - Rose)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/dashboard/attendance">
                <Button variant="yellow" size="sm" className="font-extrabold gap-1.5 shadow-sm">
                  <CalendarCheck className="w-4 h-4" />
                  <span>{isBn ? "আজকের হাজিরা" : "Mark Attendance"}</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="border-white/50 text-white hover:bg-white hover:text-emerald-800 font-bold"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                <span>{isBn ? "লগআউট" : "Sign Out"}</span>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left: Class Roster & Actions */}
            <div className="md:col-span-7 space-y-6">
              <Card className="p-6 rounded-3xl border border-emerald-100 bg-white shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {isBn ? "আমার ক্লাসের শিক্ষার্থী (Play Group - Rose)" : "My Classroom Students (Play Group - Rose)"}
                  </h3>
                  <Badge variant="green">20 Students</Badge>
                </div>

                <div className="space-y-2.5">
                  {[
                    { roll: 1, name: "Rayan Islam", id: "KGS-2026-0001", status: "Present" },
                    { roll: 2, name: "Samira Hasan", id: "KGS-2026-0004", status: "Present" },
                    { roll: 3, name: "Arian Mahmud", id: "KGS-2026-0005", status: "Late" },
                    { roll: 4, name: "Zunairah Khan", id: "KGS-2026-0006", status: "Excused" },
                  ].map((st) => (
                    <div
                      key={st.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs hover:bg-emerald-50/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-900 w-6">#{st.roll}</span>
                        <div>
                          <p className="font-extrabold text-slate-900 text-sm">{st.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{st.id}</p>
                        </div>
                      </div>
                      <Badge variant={st.status === "Present" ? "green" : "yellow"}>
                        {st.status}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <Link href="/dashboard/students">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold">
                      {isBn ? "সকল শিক্ষার্থীর তথ্য দেখুন →" : "View Full Class Details →"}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Right: Homework & Learning Activities */}
            <div className="md:col-span-5 space-y-6">
              <Card className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                  {isBn ? "হোমওয়ার্ক ও অ্যাক্টিভিটি দিন" : "Assign Learning Activity"}
                </h3>

                <form onSubmit={handleAddHw} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Subject</label>
                    <select
                      value={hwSubject}
                      onChange={(e) => setHwSubject(e.target.value)}
                      className="w-full h-10 rounded-xl border border-slate-200 px-3 text-xs font-semibold"
                    >
                      <option value="English Phonics">English Phonics</option>
                      <option value="Math & Shapes">Math & Shapes</option>
                      <option value="Art & Craft">Art & Craft</option>
                      <option value="Bangla Rhymes">Bangla Rhymes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Activity / Task</label>
                    <Input
                      required
                      value={hwTitle}
                      onChange={(e) => setHwTitle(e.target.value)}
                      placeholder="e.g. Draw a big circle and color with yellow"
                    />
                  </div>

                  <Button type="submit" variant="default" size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    <span>{isBn ? "অভিভাবকদের পাঠিয়ে দিন" : "Post to Parents"}</span>
                  </Button>
                </form>

                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <span className="font-bold text-[11px] text-slate-400 uppercase">Recent Activities</span>
                  {homeworkList.map((hw) => (
                    <div key={hw.id} className="p-3 bg-purple-50/70 rounded-xl border border-purple-100 text-xs space-y-1">
                      <span className="font-bold text-purple-700 text-[10px] uppercase">{hw.subject}</span>
                      <p className="font-semibold text-slate-800">{hw.title}</p>
                    </div>
                  ))}
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
