"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  PlusCircle,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AcademicsManagementPage() {
  const { isBn } = useLanguage();

  const classes = [
    {
      code: "PLAY",
      name: "Play Group",
      nameBn: "প্লে গ্রুপ",
      sections: ["Rose (20 seats)", "Tulip (20 seats)"],
      subjects: ["Colors & Shapes", "English Phonics", "Art & Sensory Play", "Rhymes"],
      classTeacher: "Nusrat Jahan",
    },
    {
      code: "NUR",
      name: "Nursery",
      nameBn: "নার্সারি",
      sections: ["Lily (25 seats)", "Sunflower (25 seats)"],
      subjects: ["Phonics & Blending", "Numeracy (1-20)", "Bangla Rhymes", "Nature Discovery"],
      classTeacher: "Farzana Haque",
    },
    {
      code: "KG",
      name: "KG (Kindergarten)",
      nameBn: "কেজি",
      sections: ["Jasmine (25 seats)", "Lotus (25 seats)"],
      subjects: ["Reading & Sentences", "Math & Addition", "Bangla Writing", "Moral Studies"],
      classTeacher: "Nusrat Jahan",
    },
    {
      code: "CLS-1",
      name: "Class 1",
      nameBn: "প্রথম শ্রেণি",
      sections: ["Marigold (30 seats)"],
      subjects: ["English Literature", "Bangla Language", "Mathematics", "Science & ICT"],
      classTeacher: "Sabrina Akter",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isBn ? "শ্রেণি ও কারিকুলাম ব্যবস্থাপনা" : "Class & Curriculum Management"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isBn
            ? "শ্রেণি, সেকশন, বিষয় নির্ধারণ এবং শ্রেণি শিক্ষক দায়িত্ব বণ্টন"
            : "Classes, sections, subjects, capacities and teacher assignments"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classes.map((cls) => (
          <Card key={cls.code} className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-[10px] font-black text-purple-600 block">{cls.code}</span>
                <h3 className="text-xl font-black text-slate-900">{cls.name}</h3>
              </div>
              <Badge variant="purple">
                ★ {isBn ? "শ্রেণি শিক্ষক:" : "Class Teacher:"} {cls.classTeacher}
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                {isBn ? "অনুমোদিত সেকশনসমূহ" : "Active Sections & Capacities"}
              </span>
              <div className="flex flex-wrap gap-2">
                {cls.sections.map((sec, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold">
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-400 uppercase tracking-wider block">
                {isBn ? "পাঠ্যক্রমের বিষয়সমূহ" : "Assigned Subjects"}
              </span>
              <div className="flex flex-wrap gap-2">
                {cls.subjects.map((sub, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-xl bg-purple-50 text-purple-800 font-bold">
                    • {sub}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
