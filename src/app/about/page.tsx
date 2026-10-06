"use client";

import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "lucide-react";

export default function AboutPage() {
  const { t, isBn } = useLanguage();

  const governingBody = [
    {
      name: isBn ? "প্রফেসর ড. মাহফুজুল ইসলাম" : "Prof. Dr. Mahfuzul Islam",
      role: isBn ? "চেয়ারম্যান, গভর্নিং বডি" : "Chairman, Governing Body",
      designation: isBn ? "সাবেক শিক্ষাবিদ ও শিশু মনোবিজ্ঞানী" : "Former Academic & Child Psychologist",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: isBn ? "বেগম রাশিদা খান" : "Begum Rashida Khan",
      role: isBn ? "সদস্য সচিব ও অধ্যক্ষ" : "Member Secretary & Principal",
      designation: isBn ? "এম.এড (লন্ডন), আর্লি চাইল্ডহুড স্পেশালিস্ট" : "M.Ed (London), Early Childhood Specialist",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    },
    {
      name: isBn ? "ইঞ্জিনিয়ার মোস্তাফিজুর রহমান" : "Engr. Mostafizur Rahman",
      role: isBn ? "অভিভাবক প্রতিনিধি" : "Parent Representative",
      designation: isBn ? "সমাজসেবক ও আইটি পরামর্শক" : "Philanthropist & IT Consultant",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={t.about.heading} color="purple" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {t.about.subheading}
            </h1>
            <p className="text-slate-600 text-lg leading-relaxed">
              {t.about.intro}
            </p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 rounded-3xl border-2 border-purple-200 bg-white/90 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">{t.about.missionTitle}</h3>
              <p className="text-slate-600 leading-relaxed text-base">{t.about.missionDesc}</p>
            </Card>

            <Card className="p-8 rounded-3xl border-2 border-sky-200 bg-white/90 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">{t.about.visionTitle}</h3>
              <p className="text-slate-600 leading-relaxed text-base">{t.about.visionDesc}</p>
            </Card>
          </div>

          {/* Principal's Dedicated Section */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-md flex flex-col md:flex-row items-center gap-10">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80"
              alt="Principal"
              className="w-44 h-44 sm:w-56 sm:h-56 rounded-3xl object-cover shadow-lg border-4 border-purple-100 shrink-0"
            />
            <div className="space-y-4 text-center md:text-left">
              <SectionBadge text={t.about.principalTitle} color="pink" />
              <h3 className="text-2xl font-black text-slate-900">
                {isBn ? "বেগম রাশিদা খান" : "Begum Rashida Khan"}
              </h3>
              <p className="text-slate-700 text-base leading-relaxed italic">
                "{t.about.principalMessage} প্রতিটি দিন আমাদের জন্য এক রোমাঞ্চকর আবিষ্কারের সুযোগ।"
              </p>
              <div className="pt-2 text-xs text-slate-500 font-semibold">
                {isBn ? "প্রধান মেন্টর, ব্লুম কিন্ডারগার্টেন অ্যান্ড জুনিয়র একাডেমি" : "Principal & Early Childhood Mentor, Bloom Academy"}
              </div>
            </div>
          </div>

          {/* Governing Body */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <SectionBadge text={isBn ? "পরিচালনা পর্ষদ" : "Governing Body"} color="yellow" />
              <h2 className="text-3xl font-extrabold text-slate-900">
                {isBn ? "আমাদের পরিচালনা ও উপদেষ্টা পরিষদ" : "School Advisory & Governance"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {governingBody.map((member, idx) => (
                <Card key={idx} className="p-6 rounded-3xl border border-slate-100 bg-white text-center space-y-4 shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-2xl object-cover mx-auto shadow-md"
                  />
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{member.name}</h4>
                    <p className="text-xs font-bold text-purple-600 mt-1">{member.role}</p>
                    <p className="text-xs text-slate-500 mt-1">{member.designation}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
