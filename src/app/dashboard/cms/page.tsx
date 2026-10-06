"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Globe,
  Save,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function CMSManagementPage() {
  const { isBn } = useLanguage();
  const [saving, setSaving] = useState(false);

  const [cmsData, setCmsData] = useState({
    schoolName: "Bloom Kindergarten & Junior Academy",
    schoolNameBn: "ব্লুম কিন্ডারগার্টেন অ্যান্ড জুনিয়র একাডেমি",
    tagline: "Where Every Little Step Blooms into Joyful Learning",
    taglineBn: "স্নেহ, আনন্দ ও সৃজনশীলতার নিরাপদ শিক্ষাঙ্গন",
    phone: "+880 1711-223344, +880 1811-556677",
    email: "info@bloomkindergarten.edu.bd",
    address: "Plot 14, Road 11, Sector 4, Uttara Model Town, Dhaka-1230",
    principalName: "Begum Rashida Khan",
    principalMessage:
      "Dear Parents, early childhood is life's most precious season. We treat each day as an adventure of wonder and discovery.",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(isBn ? "ওয়েবসাইটের তথ্য সফলভাবে আপডেট হয়েছে!" : "Website content updated successfully!");
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "ওয়েবসাইট কনটেন্ট ম্যানেজমেন্ট (CMS)" : "Website Content Management (CMS)"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "কোড এডিট ছাড়াই মূল ওয়েবসাইটের নাম, যোগাযোগের ঠিকানা ও বাণী পরিবর্তন করুন"
              : "Update public portal branding, contact details, and principal messages live"}
          </p>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          variant="default"
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? (isBn ? "সংরক্ষণ হচ্ছে..." : "Saving...") : (isBn ? "পরিবর্তন সংরক্ষণ করুন" : "Save Changes")}</span>
        </Button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        <Card className="p-6 sm:p-8 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {isBn ? "১. স্কুল পরিচিতি ও স্লোগান" : "1. School Identity & Branding"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">School Name (English)</label>
              <Input
                value={cmsData.schoolName}
                onChange={(e) => setCmsData({ ...cmsData, schoolName: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">স্কুলের নাম (বাংলা)</label>
              <Input
                value={cmsData.schoolNameBn}
                onChange={(e) => setCmsData({ ...cmsData, schoolNameBn: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tagline (English)</label>
              <Input
                value={cmsData.tagline}
                onChange={(e) => setCmsData({ ...cmsData, tagline: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">স্লোগান (বাংলা)</label>
              <Input
                value={cmsData.taglineBn}
                onChange={(e) => setCmsData({ ...cmsData, taglineBn: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 rounded-3xl border border-sky-100 bg-white shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {isBn ? "২. ক্যাম্পাস ঠিকানা ও ফোন নম্বর" : "2. Campus Address & Contact Info"}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Helpline Phone Numbers</label>
              <Input
                value={cmsData.phone}
                onChange={(e) => setCmsData({ ...cmsData, phone: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
              <Input
                value={cmsData.email}
                onChange={(e) => setCmsData({ ...cmsData, email: e.target.value })}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Campus Physical Address</label>
              <Input
                value={cmsData.address}
                onChange={(e) => setCmsData({ ...cmsData, address: e.target.value })}
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 rounded-3xl border border-amber-100 bg-white shadow-sm space-y-5">
          <h3 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3">
            {isBn ? "৩. অধ্যক্ষের শুভেচ্ছা বার্তা" : "3. Principal's Welcome Message"}
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Principal Name</label>
              <Input
                value={cmsData.principalName}
                onChange={(e) => setCmsData({ ...cmsData, principalName: e.target.value })}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Principal's Message Text</label>
              <textarea
                rows={4}
                value={cmsData.principalMessage}
                onChange={(e) => setCmsData({ ...cmsData, principalMessage: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs focus:ring-1 focus:ring-purple-300"
              />
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
