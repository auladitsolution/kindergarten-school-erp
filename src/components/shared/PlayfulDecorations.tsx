import React from "react";
import { Sparkles, Sun, Star, Heart, Palette } from "lucide-react";

export function PlayfulBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 opacity-40">
      {/* Top right floating sun */}
      <div className="absolute top-12 right-12 text-amber-400 animate-pulse-slow">
        <Sun className="w-16 h-16 drop-shadow-sm" />
      </div>

      {/* Floating playful shapes */}
      <div className="absolute top-1/4 left-8 text-sky-400 animate-float opacity-70">
        <Star className="w-8 h-8 fill-sky-200" />
      </div>

      <div className="absolute top-2/3 right-16 text-rose-400 animate-float-delayed opacity-70">
        <Heart className="w-9 h-9 fill-rose-200" />
      </div>

      <div className="absolute top-1/2 left-16 text-purple-400 animate-float opacity-60">
        <Sparkles className="w-7 h-7" />
      </div>

      <div className="absolute bottom-20 left-1/3 text-emerald-400 animate-float-delayed opacity-60">
        <Palette className="w-8 h-8" />
      </div>
    </div>
  );
}

export function SectionBadge({ text, color = "purple" }: { text: string; color?: "purple" | "sky" | "yellow" | "pink" | "green" }) {
  const colorMap = {
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    sky: "bg-sky-100 text-sky-700 border-sky-200",
    yellow: "bg-amber-100 text-amber-800 border-amber-200",
    pink: "bg-rose-100 text-rose-700 border-rose-200",
    green: "bg-emerald-100 text-emerald-700 border-emerald-200",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${colorMap[color]} shadow-sm`}>
      <Sparkles className="w-3.5 h-3.5" />
      {text}
    </span>
  );
}
