"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Search,
  Calendar,
  Download,
  AlertCircle,
  FileText,
  Printer,
} from "lucide-react";

export default function NoticesPage() {
  const { isBn } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");

  const notices = [
    {
      id: "1",
      title: isBn
        ? "আসন্ন শরৎ আনন্দ উৎসব ও কালার ডে উদযাপন"
        : "Autumn Joy Fest & Color Day Celebration Notice",
      content: isBn
        ? "সম্মানিত অভিভাবকবৃন্দ, আগামী বৃহস্পতিবার আমাদের ক্যাম্পাসে অনুষ্ঠিত হবে 'কালার ডে'। শিশুদের রঙিন পোশাকে সাজিয়ে পাঠাতে অনুরোধ করা হলো। এছাড়া তাদের সাথে প্রিয় একটি রঙিন খেলনা পাঠাতে পারেন।"
        : "Dear Parents, we are excited to celebrate Color Day next Thursday! Please dress your little ones in vibrant colorful outfits. They may also bring their favorite toy for show-and-tell.",
      date: "2026-10-04",
      priority: "important",
      author: "Principal's Office",
      category: isBn ? "উৎসব ও অনুষ্ঠান" : "Celebration",
    },
    {
      id: "2",
      title: isBn
        ? "মাসিক অভিভাবক ও শিক্ষক মতবিনিময় সভা (পিটিসি)"
        : "Monthly Parent-Teacher Alignment Conference (PTC)",
      content: isBn
        ? "আগামী শনিবার সকাল ৯:৩০ থেকে দুপুর ১:০০ টা পর্যন্ত অভিভাবক ও শিক্ষক মতবিনিময় সভা অনুষ্ঠিত হবে। প্রতিটি শিশুর অগ্রগতি ও অনুভূতি নিয়ে শ্রেণি শিক্ষকের সাথে আলোচনার জন্য নির্দিষ্ট সময় পেরেন্ট পোর্টালে দেখে নিন।"
        : "PTC sessions are scheduled for Saturday from 9:30 AM to 1:00 PM. Please check your individual consultation time slot inside your parent portal dashboard.",
      date: "2026-10-02",
      priority: "normal",
      author: "Academic Coordinator",
      category: isBn ? "একাডেমিক" : "Academic",
    },
    {
      id: "3",
      title: isBn
        ? "২০২৬ শিক্ষাবর্ষে প্লে, নার্সারি ও কেজি শ্রেণিতে অনলাইনে ভর্তি চলছে"
        : "Admissions Open for Academic Session 2026-2027",
      content: isBn
        ? "২০২৬ শিক্ষাবর্ষের প্লে গ্রুপ, নার্সারি এবং কেজিতে সীমিত আসনে অনলাইন ভর্তি আবেদন শুরু হয়েছে। মানসম্মত শিক্ষক-শিক্ষার্থী অনুপাত বজায় রাখার স্বার্থে আসন সংখ্যা সীমিত। আগ্রহী অভিভাবকদের দ্রুত আবেদন করতে অনুরোধ করা হচ্ছে।"
        : "Online applications are now open for prospective students. Limited seats per section to maintain our high mentor-child ratio. Parents are advised to submit early.",
      date: "2026-09-28",
      priority: "urgent",
      author: "Admission Desk",
      category: isBn ? "ভর্তি বিজ্ঞপ্তি" : "Admission",
    },
  ];

  const filtered = notices.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={isBn ? "বিজ্ঞপ্তি ও নোটিশ" : "Notice Board"} color="sky" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "স্কুলের সর্বশেষ নোটিশ ও নির্দেশনা" : "Official Notices & Announcements"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "স্কুল ছুটির নোটিশ, পরীক্ষা, অনুষ্ঠান ও জরুরি ঘোষণা এক নজরে দেখুন।"
                : "Stay updated with important announcements, circulars, and event notifications."}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? "নোটিশ খুঁজুন..." : "Search notices by keyword..."}
              className="pl-12 h-12 rounded-2xl bg-white shadow-sm"
            />
          </div>

          {/* Notices List */}
          <div className="space-y-6">
            {filtered.map((item) => (
              <Card
                key={item.id}
                className="p-6 sm:p-8 rounded-3xl border border-purple-100 bg-white shadow-md hover:shadow-lg transition-all space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {item.priority === "urgent" && (
                      <Badge variant="destructive">
                        ⚠️ {isBn ? "জরুরি নোটিশ" : "Urgent"}
                      </Badge>
                    )}
                    {item.priority === "important" && (
                      <Badge variant="yellow">
                        ⭐ {isBn ? "গুরুত্বপূর্ণ" : "Important"}
                      </Badge>
                    )}
                    <Badge variant="outline">{item.category}</Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {item.title}
                </h3>

                <p className="text-slate-700 text-base leading-relaxed">
                  {item.content}
                </p>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3">
                  <span>
                    <strong>{isBn ? "প্রকাশক:" : "Issued by:"}</strong> {item.author}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.print()}
                    className="gap-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{isBn ? "প্রিন্ট করুন" : "Print Notice"}</span>
                  </Button>
                </div>
              </Card>
            ))}

            {filtered.length === 0 && (
              <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                <Bell className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-600 font-bold">
                  {isBn ? "কোনো নোটিশ পাওয়া যায়নি" : "No notices found matching your search."}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
