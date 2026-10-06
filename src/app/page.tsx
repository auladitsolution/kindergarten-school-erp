"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Heart,
  BookOpen,
  Shield,
  Star,
  Users,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Smile,
  Music,
  Palette,
  Bus,
  Tv,
  Award,
  ArrowRight,
  HelpCircle,
  Quote,
  Clock,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { toast } from "sonner";

export default function HomePage() {
  const { t, locale, isBn } = useLanguage();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const programs = [
    {
      id: "play",
      title: t.programs.play,
      age: t.programs.playAge,
      desc: t.programs.playDesc,
      color: "bg-purple-500",
      lightColor: "bg-purple-50 border-purple-200 text-purple-900",
      badgeColor: "purple" as const,
      icon: Smile,
      capacity: isBn ? "২০ আসন / সেকশন" : "20 seats / section",
    },
    {
      id: "nursery",
      title: t.programs.nursery,
      age: t.programs.nurseryAge,
      desc: t.programs.nurseryDesc,
      color: "bg-sky-500",
      lightColor: "bg-sky-50 border-sky-200 text-sky-900",
      badgeColor: "sky" as const,
      icon: Palette,
      capacity: isBn ? "২৫ আসন / সেকশন" : "25 seats / section",
    },
    {
      id: "kg",
      title: t.programs.kg,
      age: t.programs.kgAge,
      desc: t.programs.kgDesc,
      color: "bg-amber-500",
      lightColor: "bg-amber-50 border-amber-200 text-amber-900",
      badgeColor: "yellow" as const,
      icon: Music,
      capacity: isBn ? "২৫ আসন / সেকশন" : "25 seats / section",
    },
    {
      id: "class1",
      title: t.programs.class1,
      age: t.programs.class1Age,
      desc: t.programs.class1Desc,
      color: "bg-rose-500",
      lightColor: "bg-rose-50 border-rose-200 text-rose-900",
      badgeColor: "pink" as const,
      icon: BookOpen,
      capacity: isBn ? "৩০ আসন / সেকশন" : "30 seats / section",
    },
  ];

  const facilities = [
    {
      title: t.facilities.smartClass,
      desc: t.facilities.smartClassDesc,
      icon: Tv,
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: t.facilities.playground,
      desc: t.facilities.playgroundDesc,
      icon: Smile,
      color: "text-amber-600 bg-amber-100",
    },
    {
      title: t.facilities.cctv,
      desc: t.facilities.cctvDesc,
      icon: Shield,
      color: "text-rose-600 bg-rose-100",
    },
    {
      title: t.facilities.activityLab,
      desc: t.facilities.activityLabDesc,
      icon: Palette,
      color: "text-emerald-600 bg-emerald-100",
    },
    {
      title: t.facilities.hygiene,
      desc: t.facilities.hygieneDesc,
      icon: Heart,
      color: "text-sky-600 bg-sky-100",
    },
    {
      title: t.facilities.transport,
      desc: t.facilities.transportDesc,
      icon: Bus,
      color: "text-orange-600 bg-orange-100",
    },
  ];

  const faqs = [
    {
      q: isBn ? "ভর্তির জন্য শিশুর বয়সসীমা কত?" : "What is the age criteria for admission?",
      a: isBn
        ? "প্লে গ্রুপে ভর্তির জন্য শিশুর বয়স ন্যূনতম ২.৫ বছর এবং নার্সারির জন্য ৩.৫ বছর হতে হবে।"
        : "Children must be at least 2.5 years for Play Group and 3.5 years for Nursery as of January.",
    },
    {
      q: isBn ? "স্কুলে শিশুদের নিরাপত্তার কী কী ব্যবস্থা রয়েছে?" : "What safety measures are in place?",
      a: isBn
        ? "পুরো ক্যাম্পাস সার্বক্ষণিক সিসিটিভি ক্যামেরায় আওতাভুক্ত। এছাড়া প্রশিক্ষিত আয়া ও নারী নিরাপত্তা কর্মী সর্বদা শিশুদের সাথে থাকেন।"
        : "Our campus has 24/7 CCTV surveillance, biometric parent check-in, trained female caregivers, and child-safe padded play equipment.",
    },
    {
      q: isBn ? "অনলাইনে কি বেতন পরিশোধ করা যায়?" : "Can monthly fees be paid online?",
      a: isBn
        ? "হ্যাঁ, আমাদের ইন্টিগ্রেটেড পোর্টালে বিকাশ, নগদ ও ব্যাংকের মাধ্যমে ফি পরিশোধ ও তাৎক্ষণিক ডিজিটাল রসিদ ডাউনলোড করা যায়।"
        : "Yes! Parents can pay tuition via bKash, Nagad, or Bank deposit through our secure ERP portal and immediately receive receipts.",
    },
    {
      q: isBn ? "শিক্ষক ও শিক্ষার্থীর অনুপাত কত?" : "What is the student-to-teacher ratio?",
      a: isBn
        ? "আমাদের প্রতিটি ক্লাসে সর্বোচ্চ ১৫ জন শিশুর জন্য একজন প্রধান শিক্ষক ও একজন সহকারী আয়া নিয়োজিত থাকেন।"
        : "We maintain a low 1:12 ratio with a dedicated lead teacher and assistant caregiver in every classroom.",
    },
  ];

  const testimonials = [
    {
      quote: isBn
        ? "আমার ছেলে রায়ানের প্রথম স্কুল এটি। প্রথম দিন থেকেই শিক্ষিকারা এত স্নেহ দিয়ে আপন করে নিয়েছেন যে ও প্রতিদিন স্কুলে যেতে মুখিয়ে থাকে!"
        : "Bloom is my son Rayan's first school. The warmth, joyful environment, and personal attention made him look forward to school every single morning!",
      parent: isBn ? "মোহাম্মদ রফিকুল ইসলাম" : "Mohammad Rafiqul Islam",
      role: isBn ? "অভিভাবক (প্লে গ্রুপ)" : "Parent of Rayan (Play Group)",
      rating: 5,
    },
    {
      quote: isBn
        ? "স্মার্ট ক্লাসরুম আর আর্ট ল্যাবে আনিকার সৃষ্টিশীলতা দেখে আমরা অভিভূত। অনলাইন পেরেন্ট পোর্টালে প্রতিদিনের উপস্থিতি ও ফলাফল দেখা খুবই সহজ।"
        : "We are thrilled with Anika's creativity in the Art Lab! Checking daily attendance, fee dues, and teacher remarks via the portal is super convenient.",
      parent: isBn ? "ডাঃ নাজমুল হুদা" : "Dr. Nazmul Huda",
      role: isBn ? "অভিভাবক (নার্সারি)" : "Parent of Anika (Nursery)",
      rating: 5,
    },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Heading and CTAs */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-block">
                  <SectionBadge text={t.hero.badge} color="purple" />
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
                  {t.hero.title}
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  {t.hero.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link href="/admission" className="w-full sm:w-auto">
                    <Button variant="default" size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-base shadow-lg shadow-purple-300">
                      <Sparkles className="w-5 h-5 text-amber-300" />
                      {t.hero.ctaPrimary}
                    </Button>
                  </Link>

                  <Link href="/about" className="w-full sm:w-auto">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-base border-2 hover:border-purple-300">
                      <Smile className="w-5 h-5 text-purple-600" />
                      {t.hero.ctaSecondary}
                    </Button>
                  </Link>
                </div>

                {/* Micro Key Points */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-purple-100/80">
                  <div className="p-3 bg-white/80 rounded-2xl border border-purple-50 shadow-sm text-center">
                    <p className="text-2xl font-black text-purple-600">{isBn ? "৩৫০+" : "350+"}</p>
                    <p className="text-xs font-semibold text-slate-500">{t.hero.statStudents}</p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-sky-50 shadow-sm text-center">
                    <p className="text-2xl font-black text-sky-600">{isBn ? "২৫+" : "25+"}</p>
                    <p className="text-xs font-semibold text-slate-500">{t.hero.statTeachers}</p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-amber-50 shadow-sm text-center">
                    <p className="text-2xl font-black text-amber-500">{isBn ? "১:১২" : "1:12"}</p>
                    <p className="text-xs font-semibold text-slate-500">{t.hero.statRatio}</p>
                  </div>
                  <div className="p-3 bg-white/80 rounded-2xl border border-rose-50 shadow-sm text-center">
                    <p className="text-2xl font-black text-rose-500">{isBn ? "৮+" : "8+"}</p>
                    <p className="text-xs font-semibold text-slate-500">{t.hero.statYears}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Card with playful badges */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Decorative circle glow */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-sky-300 to-amber-300 rounded-3xl blur-2xl opacity-40 animate-pulse-slow"></div>

                  {/* Main hero card */}
                  <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                    <img
                      src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80"
                      alt="Kindergarten children joyful learning"
                      className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-6 bg-gradient-to-t from-white via-white/95 to-transparent">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900 text-lg">
                            {isBn ? "নিরাপদ ও ভালোবাসাময় পরিবেশ" : "Joyful & Loving Atmosphere"}
                          </h4>
                          <p className="text-xs text-slate-500">
                            {isBn ? "দক্ষ ও সার্টিফাইড শিক্ষকদের নিবিড় পরিচর্যা" : "Certified Early Childhood Mentors"}
                          </p>
                        </div>
                        <span className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center font-bold">
                          <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating floating badge 1 */}
                  <div className="absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-3 animate-float">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isBn ? "২৪/৭ সিসিটিভি নিরাপত্তা" : "24/7 CCTV Safe"}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {isBn ? "অভিভাবকদের আস্থার প্রতীক" : "Child-First Security"}
                      </p>
                    </div>
                  </div>

                  {/* Floating badge 2 */}
                  <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-rose-100 flex items-center gap-3 animate-float-delayed">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                      <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        {isBn ? "১০০% শিশুবান্ধব" : "100% Child-Friendly"}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {isBn ? "খেলার ছলে হাতেখড়ি" : "Play & Learn"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPAL MESSAGE HIGHLIGHT */}
        <section className="py-16 bg-white border-y border-purple-100/60">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-50 via-sky-50 to-amber-50 rounded-3xl p-8 sm:p-12 border border-purple-100 shadow-sm relative overflow-hidden">
              <Quote className="absolute top-6 right-6 w-20 h-20 text-purple-200/50 -rotate-12 pointer-events-none" />
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80"
                  alt="Principal"
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover border-4 border-white shadow-lg shrink-0"
                />
                <div className="space-y-4 text-center md:text-left">
                  <SectionBadge text={t.about.principalTitle} color="purple" />
                  <p className="text-base sm:text-lg text-slate-700 italic font-medium leading-relaxed">
                    "{t.about.principalMessage}"
                  </p>
                  <div>
                    <h5 className="font-extrabold text-slate-900 text-base">
                      {isBn ? "বেগম রাশিদা খান" : "Begum Rashida Khan"}
                    </h5>
                    <p className="text-xs font-semibold text-purple-600">
                      {isBn ? "অধ্যক্ষ ও প্রধান মেন্টর, ব্লুম কিন্ডারগার্টেন একাডেমি" : "Principal & Chief Mentor, Bloom Kindergarten"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACADEMIC PROGRAMS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <SectionBadge text={t.programs.heading} color="sky" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {t.programs.subheading}
            </h2>
            <p className="text-slate-600 text-base">
              {isBn
                ? "বয়স ও মানসিক চাহিদার সাথে সামঞ্জস্য রেখে প্রতিটি স্তরে রয়েছে ভিন্ন আনন্দদায়ক পাঠ্যক্রম ও দক্ষতা মূল্যায়ন।"
                : "Every program is structured with age-appropriate milestones, tactile discovery, and gentle developmental tracking."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((prog) => {
              const Icon = prog.icon;
              return (
                <Card
                  key={prog.id}
                  className={`rounded-3xl border-2 hover:-translate-y-2 transition-all duration-300 shadow-md overflow-hidden flex flex-col justify-between ${prog.lightColor}`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl ${prog.color} text-white flex items-center justify-center shadow-md`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <Badge variant={prog.badgeColor}>{prog.age}</Badge>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">{prog.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{prog.desc}</p>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-200/50 mt-4 flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>{prog.capacity}</span>
                    <Link
                      href="/admission"
                      className="inline-flex items-center gap-1 text-purple-700 hover:text-purple-900 font-extrabold"
                    >
                      <span>{isBn ? "আবেদন করুন" : "Enroll"}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* CAMPUS FACILITIES */}
        <section className="py-20 bg-white border-y border-purple-100/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
              <SectionBadge text={t.facilities.heading} color="green" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t.facilities.subheading}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((fac, idx) => {
                const Icon = fac.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-3xl bg-slate-50/70 border border-slate-200/70 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-4"
                  >
                    <div className={`w-14 h-14 rounded-2xl ${fac.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{fac.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{fac.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* PARENT TESTIMONIALS */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
            <SectionBadge text={isBn ? "অভিভাবকদের মন্তব্য" : "Parent Voices"} color="pink" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              {isBn ? "অভিভাবকদের ভালোবাসা ও অনুভূতি" : "Loved by Parents Across Dhaka"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((item, idx) => (
              <Card key={idx} className="p-8 rounded-3xl border border-purple-100 shadow-md bg-white space-y-6">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-base text-slate-700 italic leading-relaxed">
                  "{item.quote}"
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <h4 className="font-extrabold text-slate-900 text-base">{item.parent}</h4>
                  <p className="text-xs font-semibold text-purple-600">{item.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-20 bg-white border-y border-purple-100/60">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-14">
              <SectionBadge text={isBn ? "সাধারণ জিজ্ঞাসা" : "Frequently Asked Questions"} color="yellow" />
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {isBn ? "ভর্তি ও কার্যক্রম সম্পর্কিত প্রশ্নাবলী" : "Everything You Need to Know"}
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-5 text-left flex items-center justify-between font-bold text-slate-900 text-base hover:text-purple-600"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
                        {faq.q}
                      </span>
                      <span className="text-xl text-purple-600 font-bold ml-2">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BANNER */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-sky-600 p-8 sm:p-14 text-white shadow-2xl relative overflow-hidden text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wider uppercase text-amber-200">
                {isBn ? "আসন সংখ্যা সীমিত" : "Limited Seats Available"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black">
                {isBn
                  ? "আপনার প্রিয় সন্তানের আনন্দময় শিক্ষার যাত্রা শুরু হোক আজই!"
                  : "Start Your Child's Joyful Learning Adventure Today!"}
              </h2>
              <p className="text-purple-100 text-sm sm:text-base">
                {isBn
                  ? "অনলাইনে মাত্র ২ মিনিটে ফর্ম পূরণ করুন এবং তাৎক্ষণিক রেফারেন্স নম্বর পেয়ে যান।"
                  : "Fill in our quick online admission form in under 2 minutes and get instant application tracking."}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link href="/admission">
                <Button size="lg" variant="yellow" className="font-extrabold shadow-lg">
                  <Heart className="w-5 h-5 mr-2 fill-slate-900" />
                  {t.nav.applyNow}
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white/60 bg-transparent text-white hover:bg-white hover:text-purple-700">
                  <Phone className="w-4 h-4 mr-2" />
                  {t.nav.contact}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
