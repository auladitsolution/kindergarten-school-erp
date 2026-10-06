"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Heart,
  ShieldCheck,
  Share2,
  Video,
  Globe,
} from "lucide-react";

export function Footer() {
  const { t, locale } = useLanguage();

  return (
    <footer className="border-t border-purple-100 bg-gradient-to-b from-white to-purple-50/50 pt-16 pb-12 text-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About & Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-purple-200">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {locale === "bn" ? "ব্লুম কিন্ডারগার্টেন" : "Bloom Kindergarten"}
                </h3>
                <p className="text-xs text-purple-600 font-semibold">
                  {locale === "bn" ? "আনন্দময় শৈশবের বিশ্বস্ত ঠিকানা" : "Junior Academy & Daycare"}
                </p>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed">
              {locale === "bn"
                ? "আমরা বিশ্বাস করি প্রতিটি শিশুর অন্তরে এক বিশাল সম্ভাবনা লুকায়িত। খেলার ছলে ও নিবিড় ভালোবাসায় আমরা তাদের ভবিষ্যৎ ভিত্তি গড়ে তুলি।"
                : "A world of joyful learning, kindness, and safety where young minds take confident early steps toward bright futures."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center hover:bg-purple-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Academic Programs */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {locale === "bn" ? "শিক্ষা কার্যক্রম" : "Academic Programs"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/academics" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {locale === "bn" ? "প্লে গ্রুপ (Play Group - ২.৫+ বছর)" : "Play Group (Ages 2.5 - 3.5)"}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {locale === "bn" ? "নার্সারি (Nursery - ৩.৫+ বছর)" : "Nursery (Ages 3.5 - 4.5)"}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {locale === "bn" ? "কেজি / কিন্ডারগার্টেন (KG - ৪.৫+ বছর)" : "KG / Kindergarten (Ages 4.5 - 5.5)"}
                </Link>
              </li>
              <li>
                <Link href="/academics" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {locale === "bn" ? "ক্লাস ওয়ান (Class 1 - ৫.৫+ বছর)" : "Grade 1 (Class One)"}
                </Link>
              </li>
              <li>
                <Link href="/admission" className="text-purple-600 font-bold hover:underline">
                  {locale === "bn" ? "ভর্তি নির্দেশিকা ও ফি তালিকা →" : "Admission Guide & Fees →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {locale === "bn" ? "প্রয়োজনীয় লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/faculty" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t.nav.faculty}
                </Link>
              </li>
              <li>
                <Link href="/notices" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t.nav.notices}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t.nav.events}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-slate-600 hover:text-purple-600 transition-colors">
                  {t.nav.gallery}
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-purple-600 font-bold hover:underline">
                  {locale === "bn" ? "শিক্ষক ও অভিভাবক লগইন →" : "Staff & Parent Portal →"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Campus */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {locale === "bn" ? "ক্যাম্পাস ও যোগাযোগ" : "Campus Contact"}
            </h4>
            <div className="space-y-3 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <span>
                  {locale === "bn"
                    ? "প্লট ১৪, রোড ১১, সেক্টর ৪, উত্তরা মডেল টাউন, ঢাকা-১২৩০"
                    : "Plot 14, Road 11, Sector 4, Uttara Model Town, Dhaka-1230"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-600 shrink-0" />
                <span>+880 1711-223344, +880 1811-556677</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <span>info@bloomkindergarten.edu.bd</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  {locale === "bn"
                    ? "রবি - বৃহঃ: সকাল ৮:০০ - বিকাল ৩:০০"
                    : "Sun - Thu: 8:00 AM - 3:00 PM"}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>{locale === "bn" ? "নিরাপদ শিশু সুরক্ষা সার্টিফাইড" : "Child Safeguarding Certified"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {new Date().getFullYear()}{" "}
            {locale === "bn" ? "ব্লুম কিন্ডারগার্টেন" : "Bloom Kindergarten & Junior Academy"}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-purple-600">
              {locale === "bn" ? "গভর্নিং বডি" : "Governing Body"}
            </Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-purple-600">
              {locale === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-600">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for joyful children
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
