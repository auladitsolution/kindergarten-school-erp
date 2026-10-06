"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-2xl bg-white/80 p-1 border border-slate-200/80 shadow-sm backdrop-blur-sm">
      <button
        type="button"
        onClick={() => setLocale("bn")}
        className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
          locale === "bn"
            ? "bg-purple-600 text-white shadow-sm"
            : "text-slate-600 hover:text-purple-600"
        }`}
      >
        <span>বাংলা</span>
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-bold transition-all ${
          locale === "en"
            ? "bg-purple-600 text-white shadow-sm"
            : "text-slate-600 hover:text-purple-600"
        }`}
      >
        <Languages className="w-3.5 h-3.5" />
        <span>ENG</span>
      </button>
    </div>
  );
}
