"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageToggle } from "./LanguageToggle";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Menu,
  X,
  GraduationCap,
  LogIn,
  BookOpen,
  Calendar,
  Users,
  Image as GalleryIcon,
  PhoneCall,
  Bell,
  Heart,
} from "lucide-react";

export function Navbar() {
  const { t, locale } = useLanguage();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/academics", label: t.nav.academics },
    { href: "/admission", label: t.nav.admission },
    { href: "/faculty", label: t.nav.faculty },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/notices", label: t.nav.notices },
    { href: "/events", label: t.nav.events },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-100/60 bg-white/90 backdrop-blur-md transition-all">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-purple-600 via-sky-500 to-rose-500 py-1.5 px-3 sm:px-4 text-center text-[11px] sm:text-xs font-semibold text-white flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-spin shrink-0" />
        <span className="truncate sm:overflow-visible">
          {locale === "bn"
            ? "🌟 ২০২৬ শিক্ষাবর্ষের প্লে গ্রুপ ও নার্সারিতে অনলাইনে ভর্তি আবেদন চলছে!"
            : "🌟 Admissions Open for Session 2026! Play Group & Nursery Seats are Filling Fast."}
        </span>
        <Link
          href="/admission"
          className="inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold text-white hover:bg-white/30 underline shrink-0"
        >
          {locale === "bn" ? "আবেদন করুন →" : "Apply Now →"}
        </Link>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-purple-200 group-hover:scale-105 transition-transform shrink-0">
            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-700 via-sky-600 to-rose-600 bg-clip-text text-transparent">
              {locale === "bn" ? "ব্লুম কিন্ডারগার্টেন" : "Bloom Kindergarten"}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 tracking-wider">
              {locale === "bn" ? "আনন্দময় ও আধুনিক শিক্ষাঙ্গন" : "Junior Academy & Daycare"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-purple-100/70 text-purple-700"
                    : "text-slate-600 hover:text-purple-600 hover:bg-purple-50/50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />

          <Link href="/admission" className="hidden xl:inline-flex">
            <Button variant="pink" size="sm" className="gap-1.5 shadow-rose-100">
              <Heart className="w-4 h-4 fill-white" />
              {t.nav.applyNow}
            </Button>
          </Link>

          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="default" size="sm" className="gap-1.5 shadow-purple-100">
              <LogIn className="w-4 h-4" />
              {t.nav.portalLogin}
            </Button>
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-100 bg-white/95 px-4 pt-3 pb-6 shadow-xl space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  pathname === link.href
                    ? "bg-purple-100 text-purple-700"
                    : "text-slate-700 hover:bg-purple-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link href="/admission" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="pink" className="w-full">
                {t.nav.applyNow}
              </Button>
            </Link>
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="default" className="w-full">
                <LogIn className="w-4 h-4 mr-2" />
                {t.nav.portalLogin}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
