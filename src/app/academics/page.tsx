"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  Smile,
  Palette,
  Heart,
} from "lucide-react";
import Link from "next/link";

export default function AcademicsPage() {
  const { isBn, locale } = useLanguage();
  const [selectedClass, setSelectedClass] = useState<"play" | "nursery" | "kg" | "class1">("play");

  const classData = {
    play: {
      name: isBn ? "প্লে গ্রুপ (Play Group)" : "Play Group",
      age: isBn ? "২.৫ - ৩.৫ বছর" : "2.5 - 3.5 Years",
      subjects: isBn
        ? ["বর্ণ ও আকৃতি চেনা", "ছড়া ও সঙ্গীত", "সেন্সরি খেলাধুলা", "রং ও অঙ্কন", "সামাজিক শিষ্টাচার"]
        : ["Colors & Shapes", "Nursery Rhymes", "Sensory Play & Blocks", "Finger Painting", "Social Manners"],
      routine: [
        { time: "08:30 - 09:00 AM", title: isBn ? "মর্নিং সার্কেল ও শরীরচর্চা" : "Morning Circle & Assembly" },
        { time: "09:00 - 09:45 AM", title: isBn ? "বর্ণমালা ও ধ্বনিবিজ্ঞান (Phonics)" : "Phonics & Story Time" },
        { time: "09:45 - 10:15 AM", title: isBn ? "পুষ্টিকর টিফিন ও হাত ধোয়া" : "Snacks & Nutrition Time" },
        { time: "10:15 - 11:00 AM", title: isBn ? "মাটির কাজ ও আর্ট ক্রাফট" : "Clay Modelling & Art Lab" },
        { time: "11:00 - 11:30 AM", title: isBn ? "খেলার মাঠে মুক্ত খেলা" : "Free Outdoor Playground Fun" },
      ],
      skills: isBn
        ? ["দৃষ্টি ও শ্রবণ সমন্বয়", "ভাষা বিকাশ", "সহানুভূতি ও বন্ধুত্ব", "শারীরিক ভারসাম্য"]
        : ["Visual-Motor Coordination", "Early Speech & Vocabulary", "Sharing & Empathy", "Gross Motor Balance"],
    },
    nursery: {
      name: isBn ? "নার্সারি (Nursery)" : "Nursery",
      age: isBn ? "৩.৫ - ৪.৫ বছর" : "3.5 - 4.5 Years",
      subjects: isBn
        ? ["ইংরেজি ফনিক্স", "বাংলা ছড়া ও বর্ণ", "প্রাথমিক সংখ্যা গণনা (১-২০)", "সাধারণ বিজ্ঞান ও প্রকৃতি", "চিত্রাঙ্কন"]
        : ["English Phonics", "Bangla Alphabet & Rhymes", "Foundational Numeracy (1-20)", "Nature Discovery", "Drawing"],
      routine: [
        { time: "08:30 - 09:00 AM", title: isBn ? "সমাবেশ ও জাতীয় সঙ্গীত" : "Morning Assembly & Warmup" },
        { time: "09:00 - 09:50 AM", title: isBn ? "ইংরেজি শব্দ গঠন ও রিডিং" : "Phonics Reading & Blending" },
        { time: "09:50 - 10:20 AM", title: isBn ? "টিফিন বিরতি" : "Healthy Tiffin Break" },
        { time: "10:20 - 11:10 AM", title: isBn ? "গণিত ও সংখ্যা খেলা" : "Math Games & Counters" },
        { time: "11:10 - 12:00 PM", title: isBn ? "আর্ট, ক্রাফট ও গান" : "Music, Art & Rhymes" },
      ],
      skills: isBn
        ? ["পেন্সিল গ্রিপ ও সূক্ষ্ম মোটর দক্ষতা", "স্বাধীন আত্মবিশ্বাস", "নির্দেশনা অনুসরণ"]
        : ["Pencil Grip & Fine Motor Skills", "Independent Problem Solving", "Active Listening"],
    },
    kg: {
      name: isBn ? "কেজি (Kindergarten)" : "Kindergarten (KG)",
      age: isBn ? "৪.৫ - ৫.৫ বছর" : "4.5 - 5.5 Years",
      subjects: isBn
        ? ["ইংরেজি রিডিং ও রাইটিং", "বাংলা বানান ও বাক্য", "গণিত (যোগ-বিয়োগ ধারণা)", "সাধারণ জ্ঞান ও নৈতিকতা", "কম্পিউটার পরিচয়"]
        : ["Reading & Creative Writing", "Bangla Sentences", "Math & Addition Basics", "Moral Studies & GK", "Intro to ICT"],
      routine: [
        { time: "08:30 - 09:00 AM", title: isBn ? "প্রাতঃকালীন সমাবেশ" : "Morning Assembly" },
        { time: "09:00 - 09:50 AM", title: isBn ? "ইংরেজি ব্যাকরণ ও কথন" : "English Speech & Grammar" },
        { time: "09:50 - 10:40 AM", title: isBn ? "বাংলা পাঠ ও হাতের লেখা" : "Bangla Reading & Handwriting" },
        { time: "10:40 - 11:10 AM", title: isBn ? "টিফিন বিরতি" : "Tiffin & Refreshment" },
        { time: "11:10 - 12:00 PM", title: isBn ? "গণিত অনুশীলন" : "Practical Mathematics" },
        { time: "12:00 - 12:45 PM", title: isBn ? "বিজ্ঞান ল্যাব ও সৃজনশীলতা" : "Science Lab Exploration" },
      ],
      skills: isBn
        ? ["বাক্য রচনা ও সাবলীল পাঠ", "গাণিতিক যুক্তি", "দলগত নেতৃত্ব"]
        : ["Fluent Reading & Sentence Formation", "Mathematical Logic", "Collaborative Leadership"],
    },
    class1: {
      name: isBn ? "প্রথম শ্রেণি (Class 1)" : "Class One (Grade 1)",
      age: isBn ? "৫.৫+ বছর" : "5.5+ Years",
      subjects: isBn
        ? ["ইংরেজি", "বাংলা", "গণিত", "বাংলাদেশ ও বিশ্বপরিচয়", "ইসলাম/নৈতিক শিক্ষা", "বিজ্ঞান ও আর্ট"]
        : ["English", "Bangla", "Mathematics", "Social Studies", "Moral Education", "General Science & Art"],
      routine: [
        { time: "08:30 - 09:00 AM", title: isBn ? "সমাবেশ ও শৃঙ্খলা" : "Assembly & Discipline" },
        { time: "09:00 - 09:50 AM", title: isBn ? "ইংরেজি সাহিত্য ও রচনা" : "English Literature" },
        { time: "09:50 - 10:40 AM", title: isBn ? "গণিত" : "Mathematics" },
        { time: "10:40 - 11:10 AM", title: isBn ? "টিফিন বিরতি" : "Tiffin Break" },
        { time: "11:10 - 12:00 PM", title: isBn ? "বাংলা ব্যাকরণ ও সাহিত্য" : "Bangla Language" },
        { time: "12:00 - 12:50 PM", title: isBn ? "বিজ্ঞান ও পরিবেশ" : "Environmental Science" },
      ],
      skills: isBn
        ? ["প্রাথমিক একাডেমিক প্রস্তুতি", "বিশ্লেষণ ক্ষমতা", "পরীক্ষায় আত্মবিশ্বাস"]
        : ["Structured Academic Foundation", "Critical Thinking", "Assessment Confidence"],
    },
  };

  const current = classData[selectedClass];

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={isBn ? "শিক্ষা কার্যক্রম" : "Academic Framework"} color="sky" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "শিশুর মেধা ও আনন্দের সুষম সমন্বয়" : "Holistic Curriculum Designed for Young Wonder"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "খেলার ছলে শেখার আন্তর্জাতিক মন্টেসরি ও আধুনিক পদ্ধতির সংমিশ্রণে গঠিত আমাদের পাঠ্যক্রম।"
                : "A world-class hybrid of Montessori hands-on exploration and international early education standards."}
            </p>
          </div>

          {/* Class Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {(["play", "nursery", "kg", "class1"] as const).map((key) => {
              const item = classData[key];
              const isSelected = selectedClass === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setSelectedClass(key)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-purple-200 scale-105"
                      : "bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Class Details Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Col: Subjects & Skills */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-6 rounded-3xl border border-purple-100 bg-white shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h3 className="text-2xl font-black text-slate-900">{current.name}</h3>
                  <Badge variant="purple">{current.age}</Badge>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {isBn ? "অন্তর্ভুক্ত বিষয়সমূহ" : "Curriculum Subjects"}
                  </h4>
                  <div className="space-y-2">
                    {current.subjects.map((sub, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {isBn ? "দক্ষতা বিকাশ লক্ষ্যমাত্রা" : "Core Skill Milestones"}
                  </h4>
                  <div className="space-y-2">
                    {current.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-700 font-medium">
                        <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/admission">
                    <Button variant="default" className="w-full gap-2">
                      <Heart className="w-4 h-4 fill-white" />
                      {isBn ? "এই ক্লাসে ভর্তি আবেদন করুন" : "Enroll for This Class"}
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>

            {/* Right Col: Daily Class Routine */}
            <div className="lg:col-span-7">
              <Card className="p-6 sm:p-8 rounded-3xl border border-sky-100 bg-white shadow-md space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">
                      {isBn ? "দৈনিক আনন্দময় ক্লাস রুটিন" : "Daily Activity Schedule"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isBn ? "শিক্ষার্থীদের স্বতঃস্ফূর্ত অংশগ্রহণে সাজানো সময়সূচি" : "Balanced schedule with rest, play and learning"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {current.routine.map((slot, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-purple-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-xs font-black flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>
                        <span className="font-bold text-slate-800 text-sm">{slot.title}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-xl border border-slate-200 self-start sm:self-auto">
                        {slot.time}
                      </span>
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
