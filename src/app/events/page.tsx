"use client";

import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Trophy,
} from "lucide-react";

export default function EventsPage() {
  const { isBn } = useLanguage();

  const events = [
    {
      id: "1",
      title: isBn
        ? "বার্ষিক ক্ষুদে চ্যাম্পিয়ন ক্রীড়া প্রতিযোগিতা"
        : "Annual Little Champions Sports Meet 2026",
      desc: isBn
        ? "দৌড়, ব্যালেন্সিং গেম এবং অভিভাবকদের আনন্দদায়ক প্রতিযোগিতায় মুখরিত বার্ষিক ক্রীড়া উৎসব। প্রতিটি শিশুর জন্য রয়েছে উদ্দীপনামূলক পুরস্কার।"
        : "A joyful day of toddler sprint races, balloon bursting, sensory obstacle courses, and family games on our lush green school ground.",
      date: "2026-11-14",
      time: "09:00 AM - 02:00 PM",
      venue: isBn ? "স্কুল মূল সবুজ খেলার মাঠ" : "Main Campus Green Grounds",
      cover: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&auto=format&fit=crop&q=80",
      category: isBn ? "ক্রীড়া উৎসব" : "Sports",
    },
    {
      id: "2",
      title: isBn
        ? "ক্ষুদে বিজ্ঞানী ও চিত্রাঙ্কন প্রদর্শনী মেলা"
        : "Young Explorers Science & Art Fair",
      desc: isBn
        ? "শিশুদের তৈরি রঙিন চিত্রকর্ম, মাটির ভাস্কর্য এবং সহজ বিজ্ঞানের মজার পরীক্ষা প্রদর্শনী। অভিভাবকদের স্বতঃস্ফূর্ত আমন্ত্রণ।"
        : "Interactive baking soda volcanoes, colorful watercolor showcase, pottery sculptures, and hands-on toddler science experiments.",
      date: "2026-12-05",
      time: "10:00 AM - 04:00 PM",
      venue: isBn ? "অডিটোরিয়াম ও আর্ট স্টুডিও" : "Campus Auditorium & Art Studio",
      cover: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
      category: isBn ? "সৃজনশীল মেলা" : "Cultural",
    },
    {
      id: "3",
      title: isBn
        ? "ফল উৎসব ও স্বাস্থ্য সচেতনতা দিবস"
        : "Fresh Fruits & Healthy Habits Day",
      desc: isBn
        ? "দেশীয় ও পুষ্টিকর ফল চেনা, স্বাদ নেওয়া এবং স্বাস্থ্যসম্মত খাবার অভ্যাসে উদ্বুদ্ধ করার বিশেষ আয়োজন।"
        : "Tasting seasonal fruits, fun nutrition trivia, handwashing songs, and fun cooking play with child caregivers.",
      date: "2026-10-25",
      time: "10:30 AM - 01:00 PM",
      venue: isBn ? "স্কুল ক্যাফেটেরিয়া ও গার্ডেন" : "School Garden & Dining Corner",
      cover: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
      category: isBn ? "স্বাস্থ্য ও শিক্ষা" : "Activity",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={isBn ? "অনুষ্ঠানমালা" : "Campus Calendar & Events"} color="yellow" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "আনন্দময় উৎসব ও ক্যালেন্ডার ইভেন্ট" : "Celebrations That Make Childhood Magical"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "আমাদের সারাবছরের সাংস্কৃতিক, ক্রীড়া ও শিক্ষামূলক বর্ণাঢ্য আয়োজনের সময়সূচি।"
                : "Explore our rich calendar of celebrations, seasonal fests, and friendly competitions."}
            </p>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((evt) => (
              <Card
                key={evt.id}
                className="rounded-3xl border border-purple-100 bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={evt.cover}
                      alt={evt.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <Badge variant="purple" className="absolute top-4 left-4 shadow-md">
                      {evt.category}
                    </Badge>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-black text-slate-900 leading-tight">
                      {evt.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {evt.desc}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-2 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{evt.venue}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
