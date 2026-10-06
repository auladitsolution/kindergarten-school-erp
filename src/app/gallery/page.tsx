"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Camera,
  X,
  Maximize2,
} from "lucide-react";

export default function GalleryPage() {
  const { isBn } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activePhoto, setActivePhoto] = useState<any | null>(null);

  const galleryItems = [
    {
      id: 1,
      title: isBn ? "রঙিন খেলার মাঠ ও আনন্দক্ষণ" : "Playground Fun & Joy",
      category: "campus",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "ক্যাম্পাস" : "Campus",
    },
    {
      id: 2,
      title: isBn ? "চিত্রাঙ্কন ও আর্ট ল্যাব অনুশীলন" : "Art & Craft Discovery",
      category: "art",
      url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "চারুকলা" : "Art & Craft",
    },
    {
      id: 3,
      title: isBn ? "বার্ষিক ক্রীড়া প্রতিযোগিতা" : "Annual Sports Meet",
      category: "sports",
      url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "খেলাধুলা" : "Sports",
    },
    {
      id: 4,
      title: isBn ? "বসন্ত উৎসব ও শিশু মেলা" : "Spring Joy Festival",
      category: "events",
      url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "উৎসব" : "Celebrations",
    },
    {
      id: 5,
      title: isBn ? "স্মার্ট ক্লাসরুমে গল্প বলা" : "Storytime in Smart Class",
      category: "campus",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "ক্যাম্পাস" : "Campus",
    },
    {
      id: 6,
      title: isBn ? "ক্ষুদে গণিত ও পাজল সলভিং" : "Math Games & Puzzle Solving",
      category: "art",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop&q=80",
      categoryLabel: isBn ? "চারুকলা" : "Art & Craft",
    },
  ];

  const filtered =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={isBn ? "স্মৃতির ফটো অ্যালবাম" : "Moments & Gallery"} color="purple" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "ক্যাম্পাসের সোনালী আনন্দময় মুহূর্তসমূহ" : "Captured Smiles and Precious Memories"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "আমাদের ক্ষুদে শিক্ষার্থীদের হাসিমুখ, সৃজনশীল কাজ ও উৎসবমুখর মুহূর্তের ছবির ঝলক।"
                : "A glimpse into everyday wonder, playful learning, sports and festive celebrations."}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: "all", label: isBn ? "সব ছবি" : "All Photos" },
              { id: "campus", label: isBn ? "ক্যাম্পাস" : "Campus" },
              { id: "art", label: isBn ? "চারুকলা ও ল্যাব" : "Art & Craft" },
              { id: "sports", label: isBn ? "ক্রীড়া ও খেলাধুলা" : "Sports" },
              { id: "events", label: isBn ? "উৎসব ও অনুষ্ঠান" : "Events" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200 scale-105"
                    : "bg-white text-slate-700 hover:bg-purple-50 hover:text-purple-700 border border-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Photos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl bg-white border border-slate-100 shadow-md hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-white">
                  <Badge variant="purple" className="self-start mb-2">
                    {photo.categoryLabel}
                  </Badge>
                  <h4 className="font-extrabold text-base">{photo.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {activePhoto && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setActivePhoto(null)}
            >
              <div
                className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
                >
                  <X className="w-5 h-5" />
                </button>
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="w-full max-h-[75vh] object-contain bg-slate-950"
                />
                <div className="p-6 bg-white flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{activePhoto.title}</h3>
                    <p className="text-xs text-purple-600 font-bold mt-1">{activePhoto.categoryLabel}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
