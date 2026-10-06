"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Bell,
  PlusCircle,
  Calendar,
  AlertCircle,
  Trash2,
  X,
  Send,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { INotice } from "@/types";

export default function NoticesManagementPage() {
  const { isBn } = useLanguage();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [notices, setNotices] = useState<INotice[]>([
    {
      _id: "not-1",
      title: "Autumn Joy Fest & Color Day Notice",
      content:
        "Please dress children in bright colorful outfits for Color Day next Thursday! Fun activities and games await.",
      audience: "all",
      priority: "important",
      publishedDate: "2026-10-04",
      isActive: true,
      authorName: "Principal's Office",
    },
    {
      _id: "not-2",
      title: "Parent-Teacher Conference (PTC) Schedule",
      content:
        "PTC sessions are scheduled for Saturday. Parents are requested to consult individual time slots via portal.",
      audience: "parents",
      priority: "normal",
      publishedDate: "2026-10-02",
      isActive: true,
      authorName: "Academic Desk",
    },
    {
      _id: "not-3",
      title: "Online Admission Open for Session 2026",
      content:
        "Admissions are open for Play Group, Nursery & KG. Limited seats to ensure high caregiver ratio.",
      audience: "public",
      priority: "urgent",
      publishedDate: "2026-09-28",
      isActive: true,
      authorName: "Admission Desk",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    audience: "all" as const,
    priority: "normal" as const,
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotice: INotice = {
      _id: `not-${Date.now()}`,
      title: formData.title,
      content: formData.content,
      audience: formData.audience,
      priority: formData.priority,
      publishedDate: new Date().toISOString().split("T")[0],
      isActive: true,
      authorName: "Principal / Admin",
    };

    setNotices([newNotice, ...notices]);
    toast.success(isBn ? "বিজ্ঞপ্তি সফলভাবে প্রকাশিত হয়েছে!" : "Notice published successfully!");
    setIsAddOpen(false);
    setFormData({ title: "", content: "", audience: "all", priority: "normal" });
  };

  const handleDelete = (id: string) => {
    setNotices(notices.filter((n) => n._id !== id));
    toast.success(isBn ? "বিজ্ঞপ্তি মুছে ফেলা হয়েছে" : "Notice removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "বিজ্ঞপ্তি ও বার্তা প্রকাশনা" : "Notices & Broadcast Center"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "অভিভাবক, শিক্ষক ও সাধারণ দর্শনার্থীদের জন্য জরুরি সার্কুলার প্রকাশ"
              : "Publish circulars, announcements and priority notifications"}
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          variant="default"
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isBn ? "নতুন নোটিশ প্রকাশ" : "Publish Notice"}</span>
        </Button>
      </div>

      {/* Notices List */}
      <div className="space-y-4">
        {notices.map((n) => (
          <Card key={n._id} className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {n.priority === "urgent" && <Badge variant="destructive">⚠️ Urgent</Badge>}
                {n.priority === "important" && <Badge variant="yellow">⭐ Important</Badge>}
                <Badge variant="outline">Audience: {n.audience}</Badge>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-semibold">{n.publishedDate}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(n._id!)}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900">{n.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{n.content}</p>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 font-semibold">
              Author: {n.authorName}
            </div>
          </Card>
        ))}
      </div>

      {/* PUBLISH MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 my-auto max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBn ? "নতুন নোটিশ তৈরি করুন" : "Compose New Announcement"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{isBn ? "শিরোনাম *" : "Title *"}</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Eid-ul-Fitr Holiday Schedule"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "প্রাপক *" : "Audience *"}</label>
                  <select
                    value={formData.audience}
                    onChange={(e: any) => setFormData({ ...formData, audience: e.target.value })}
                    className="w-full h-11 rounded-2xl border border-slate-200 px-3 text-xs font-semibold"
                  >
                    <option value="all">সকল (All Users)</option>
                    <option value="parents">অভিভাবক (Parents Only)</option>
                    <option value="teachers">শিক্ষক (Teachers Only)</option>
                    <option value="public">ওয়েবসাইট (Public Notice)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "অগ্রাধিকার *" : "Priority *"}</label>
                  <select
                    value={formData.priority}
                    onChange={(e: any) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full h-11 rounded-2xl border border-slate-200 px-3 text-xs font-semibold"
                  >
                    <option value="normal">সাধারণ (Normal)</option>
                    <option value="important">গুরুত্বপূর্ণ (Important)</option>
                    <option value="urgent">জরুরি (Urgent)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{isBn ? "বিস্তারিত বিষয়বস্তু *" : "Content *"}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 p-3 text-xs focus:ring-1 focus:ring-purple-300"
                  placeholder="Write announcement details..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  {isBn ? "বাতিল" : "Cancel"}
                </Button>
                <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-700">
                  {isBn ? "প্রকাশ করুন" : "Publish Now"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
