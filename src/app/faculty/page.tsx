"use client";

import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Heart,
  Award,
} from "lucide-react";

export default function FacultyPage() {
  const { isBn } = useLanguage();

  const teachers = [
    {
      id: "1",
      name: isBn ? "নুসরাত জাহান" : "Nusrat Jahan",
      designation: isBn ? "সিনিয়র এডুকেটর (প্লে ও কেজি)" : "Senior Kindergarten Educator",
      qualification: isBn ? "এম.এ (ইংরেজি, ঢাবি), আর্লি চাইল্ডহুড সার্টিফাইড" : "M.A in English (DU), Early Childhood Certified",
      classes: isBn ? "প্লে গ্রুপ, কেজি" : "Play Group, KG",
      subjects: isBn ? "ইংরেজি ফনিক্স, আর্ট অ্যান্ড ক্রাফট" : "English Phonics, Art & Craft",
      photo: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80",
      bio: isBn
        ? "শিশুদের মনের ভাষা বুঝে স্নেহ দিয়ে শেখাতে তিনি সবসময় আন্তরিক।"
        : "Dedicated to creating affectionate and interactive environments where every child discovers joy.",
    },
    {
      id: "2",
      name: isBn ? "ফারজানা হক" : "Farzana Haque",
      designation: isBn ? "সহকারী শিক্ষক (গণিত ও বিজ্ঞান)" : "Assistant Teacher (Numeracy)",
      qualification: isBn ? "বি.এসসি (গণিত), মন্টেসরি সার্টিফাইড" : "B.Sc in Mathematics, Montessori Certified",
      classes: isBn ? "নার্সারি, কেজি" : "Nursery, KG",
      subjects: isBn ? "মজার গণিত, গল্পবলা" : "Foundational Math, Storytelling",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
      bio: isBn
        ? "খেলার মাধ্যমে বাস্তব উপকরণের সাহায্যে গণিত ও বিজ্ঞানের আনন্দ ছড়িয়ে দেন।"
        : "Specializes in hands-on math manipulative games and early cognitive growth.",
    },
    {
      id: "3",
      name: isBn ? "মাহফুজুর রহমান" : "Mahfuzur Rahman",
      designation: isBn ? "শারীরিক শিক্ষা ও অ্যাক্টিভিটি সমন্বয়ক" : "Physical Activity Coordinator",
      qualification: isBn ? "বি.পি.এড, সার্টিফাইড চাইল্ড ফিটনেস ট্রেইনার" : "B.P.Ed, Certified Child Fitness Coach",
      classes: isBn ? "সকল শ্রেণি" : "All Classes",
      subjects: isBn ? "শরীরচর্চা, খেলাধুলা ও সঙ্গীত" : "Physical Education, Music & Movement",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
      bio: isBn
        ? "শিশুদের শারীরিক সুস্থতা ও উদ্দীপনাময় খেলাধুলার দায়িত্ব পরম যত্নে পালন করেন।"
        : "Passionate about encouraging agility, teamwork, and active outdoor play among little ones.",
    },
    {
      id: "4",
      name: isBn ? "সাবরিনা আক্তার" : "Sabrina Akter",
      designation: isBn ? "ভাষা ও ধ্বনিতত্ত্ব বিশেষজ্ঞ" : "Language & Phonics Specialist",
      qualification: isBn ? "এম.এ (ভাষাতত্ত্ব, জাবি), শিশু মনোবিজ্ঞান ডিপ্লোমা" : "M.A in Linguistics (JU), Child Psychology Certified",
      classes: isBn ? "নার্সারি, ১ম শ্রেণি" : "Nursery, Class 1",
      subjects: isBn ? "বাংলা ছড়া, প্রাথমিক ব্যাকরণ" : "Bangla Rhymes, English Phonics",
      photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
      bio: isBn
        ? "শিশুদের শুদ্ধ উচ্চারণ ও শব্দভাণ্ডার সমৃদ্ধ করতে নিবেদিতপ্রাণ।"
        : "Passionate about multilingual storytelling and early speech development.",
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
            <SectionBadge text={isBn ? "শিক্ষকমণ্ডলী" : "Mentors & Faculty"} color="pink" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "স্নেহশীল ও আন্তর্জাতিক মানসম্পন্ন শিক্ষকবৃন্দ" : "Loving Mentors Inspiring Little Minds"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "আমাদের প্রতিটি শিক্ষক আর্লি চাইল্ডহুড কেয়ার ও ইতিবাচক শিক্ষণ পদ্ধতিতে বিশেষভাবে প্রশিক্ষিত।"
                : "Every faculty member is certified in early childhood psychology and positive reinforcement pedagogy."}
            </p>
          </div>

          {/* Teachers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teachers.map((teacher) => (
              <Card
                key={teacher.id}
                className="p-6 sm:p-8 rounded-3xl border border-purple-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6"
              >
                <img
                  src={teacher.photo}
                  alt={teacher.name}
                  className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl object-cover shadow-md shrink-0 border-2 border-purple-100"
                />

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{teacher.name}</h3>
                    <p className="text-xs font-bold text-purple-600 mt-0.5">{teacher.designation}</p>
                  </div>

                  <p className="text-xs text-slate-500 font-medium">{teacher.qualification}</p>

                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p>
                      <strong className="text-slate-800">{isBn ? "ক্লাস:" : "Classes:"}</strong> {teacher.classes}
                    </p>
                    <p>
                      <strong className="text-slate-800">{isBn ? "বিষয়:" : "Subjects:"}</strong> {teacher.subjects}
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 italic pt-1">
                    "{teacher.bio}"
                  </p>
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
