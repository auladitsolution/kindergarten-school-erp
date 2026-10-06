"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Printer,
  Copy,
  Heart,
  Baby,
  User,
  Home,
  Phone,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

export default function AdmissionPage() {
  const { t, isBn, locale } = useLanguage();
  const [activeTab, setActiveTab] = useState<"apply" | "track">("apply");

  // Form State
  const [formData, setFormData] = useState({
    childName: "",
    childNameBn: "",
    dob: "",
    gender: "Male",
    appliedClass: "Play Group",
    bloodGroup: "A+",
    previousSchool: "",
    fatherName: "",
    fatherPhone: "",
    fatherOccupation: "",
    motherName: "",
    motherPhone: "",
    motherOccupation: "",
    presentAddress: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Tracking State
  const [searchRef, setSearchRef] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackResult, setTrackResult] = useState<any>(null);
  const [trackError, setTrackError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/admissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedRef(data.applicationNo);
        toast.success(isBn ? "ভর্তি আবেদন সফলভাবে গৃহীত হয়েছে!" : "Admission application submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit application");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    setTrackingLoading(true);
    setTrackError(null);
    setTrackResult(null);

    try {
      const res = await fetch(`/api/admissions/track?ref=${encodeURIComponent(searchRef.trim())}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setTrackResult(data.data);
      } else {
        setTrackError(data.error || "No application found with this reference.");
      }
    } catch {
      setTrackError("Error contacting tracking server.");
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <SectionBadge text={isBn ? "ভর্তি কার্যক্রম ২০২৬" : "Admission Portal 2026"} color="purple" />
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
              {isBn ? "অনলাইন ভর্তি ও ট্র্যাকিং পোর্টাল" : "Online Admission & Application Tracking"}
            </h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              {isBn
                ? "খুব সহজে ঘরে বসেই আপনার সন্তানের ভর্তি ফরম পূরণ করুন অথবা পূর্বের আবেদনের অবস্থা যাচাই করুন।"
                : "Submit your child's enrollment application securely or check the status of your existing application."}
            </p>

            {/* Toggle Tabs */}
            <div className="inline-flex rounded-2xl bg-white p-1.5 border border-purple-100 shadow-sm mt-4">
              <button
                type="button"
                onClick={() => setActiveTab("apply")}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === "apply"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "text-slate-600 hover:text-purple-600"
                }`}
              >
                {isBn ? "📝 নতুন ভর্তি আবেদন" : "📝 New Application"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("track")}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  activeTab === "track"
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200"
                    : "text-slate-600 hover:text-purple-600"
                }`}
              >
                {isBn ? "🔍 আবেদনের অবস্থা যাচাই" : "🔍 Track Application"}
              </button>
            </div>
          </div>

          {/* TAB 1: NEW APPLICATION */}
          {activeTab === "apply" && (
            <div>
              {submittedRef ? (
                /* SUCCESS VIEW */
                <Card className="rounded-3xl border-2 border-emerald-200 bg-white shadow-xl p-8 sm:p-12 text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-12 h-12" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {isBn ? "আবেদন সফলভাবে গৃহীত হয়েছে!" : "Application Submitted Successfully!"}
                    </h3>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      {isBn
                        ? "আপনার আবেদনটি পর্যালোচনার জন্য জমা দেওয়া হয়েছে। অনুগ্রহ করে নিচের ট্র্যাকিং নম্বরটি সংরক্ষণ করুন।"
                        : "Your admission application is currently under review by our admission desk. Please save your reference code below."}
                    </p>
                  </div>

                  <div className="p-6 bg-purple-50 rounded-2xl border border-purple-100 inline-block max-w-md mx-auto">
                    <p className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
                      {isBn ? "আবেদন রেফারেন্স কোড" : "Application Tracking Code"}
                    </p>
                    <p className="text-3xl font-black text-slate-900 tracking-widest">{submittedRef}</p>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(submittedRef);
                        toast.success("Copied to clipboard!");
                      }}
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {isBn ? "কোড কপি করুন" : "Copy Code"}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Button
                      variant="outline"
                      onClick={() => window.print()}
                      className="gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      {isBn ? "রসিদ প্রিন্ট করুন" : "Print Receipt"}
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => {
                        setSubmittedRef(null);
                        setFormData({
                          childName: "",
                          childNameBn: "",
                          dob: "",
                          gender: "Male",
                          appliedClass: "Play Group",
                          bloodGroup: "A+",
                          previousSchool: "",
                          fatherName: "",
                          fatherPhone: "",
                          fatherOccupation: "",
                          motherName: "",
                          motherPhone: "",
                          motherOccupation: "",
                          presentAddress: "",
                          email: "",
                        });
                      }}
                    >
                      {isBn ? "অন্য আরেকটি আবেদন করুন" : "Submit Another Application"}
                    </Button>
                  </div>
                </Card>
              ) : (
                /* FORM VIEW */
                <form onSubmit={handleApplySubmit} className="space-y-8">
                  {/* Section 1: Child Info */}
                  <Card className="rounded-3xl border border-purple-100 bg-white shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                        <Baby className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">
                          {isBn ? "১. শিক্ষার্থীর প্রাথমিক তথ্য" : "1. Child Information"}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {isBn ? "শিশুর জন্ম সনদ অনুযায়ী সঠিক তথ্য দিন" : "As per child birth certificate"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "শিক্ষার্থীর পূর্ণ নাম (English) *" : "Full Name (English) *"}
                        </label>
                        <Input
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Rayan Islam"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "শিক্ষার্থীর নাম (বাংলা)" : "Full Name (Bangla)"}
                        </label>
                        <Input
                          name="childNameBn"
                          value={formData.childNameBn}
                          onChange={handleInputChange}
                          placeholder="উদাঃ রায়ান ইসলাম"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "জন্ম তারিখ *" : "Date of Birth *"}
                        </label>
                        <Input
                          type="date"
                          name="dob"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "লিঙ্গ *" : "Gender *"}
                        </label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800"
                        >
                          <option value="Male">{isBn ? "ছেলে (Male)" : "Male"}</option>
                          <option value="Female">{isBn ? "মেয়ে (Female)" : "Female"}</option>
                          <option value="Other">{isBn ? "অন্যান্য (Other)" : "Other"}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "ভর্তির শ্রেণি *" : "Applying For Class *"}
                        </label>
                        <select
                          name="appliedClass"
                          value={formData.appliedClass}
                          onChange={handleInputChange}
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800"
                        >
                          <option value="Play Group">Play Group (২.৫ - ৩.৫ বছর)</option>
                          <option value="Nursery">Nursery (৩.৫ - ৪.৫ বছর)</option>
                          <option value="KG">KG (৪.৫ - ৫.৫ বছর)</option>
                          <option value="Class 1">Class 1 (৫.৫+ বছর)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "রক্তের গ্রুপ" : "Blood Group"}
                        </label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full h-12 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800"
                        >
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                        </select>
                      </div>
                    </div>
                  </Card>

                  {/* Section 2: Guardian Info */}
                  <Card className="rounded-3xl border border-sky-100 bg-white shadow-md p-6 sm:p-8 space-y-6">
                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-lg">
                          {isBn ? "২. অভিভাবকের তথ্য ও যোগাযোগ" : "2. Parent & Contact Details"}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {isBn ? "জরুরি যোগাযোগের জন্য সঠিক মোবাইল নম্বর দিন" : "Valid phone numbers for SMS alerts"}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "পিতার পূর্ণ নাম *" : "Father's Full Name *"}
                        </label>
                        <Input
                          name="fatherName"
                          value={formData.fatherName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Mohammad Rafiqul Islam"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "পিতার মোবাইল নম্বর *" : "Father's Mobile Number *"}
                        </label>
                        <Input
                          name="fatherPhone"
                          value={formData.fatherPhone}
                          onChange={handleInputChange}
                          required
                          placeholder="+88017XXXXXXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "মাতার পূর্ণ নাম *" : "Mother's Full Name *"}
                        </label>
                        <Input
                          name="motherName"
                          value={formData.motherName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Salma Begum"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "মাতার মোবাইল নম্বর" : "Mother's Mobile Number"}
                        </label>
                        <Input
                          name="motherPhone"
                          value={formData.motherPhone}
                          onChange={handleInputChange}
                          placeholder="+88018XXXXXXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "ইমেইল ঠিকানা *" : "Email Address *"}
                        </label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="parent@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          {isBn ? "বর্তমান ঠিকানা (পূর্ণ ঠিকানা) *" : "Residential Address *"}
                        </label>
                        <Input
                          name="presentAddress"
                          value={formData.presentAddress}
                          onChange={handleInputChange}
                          required
                          placeholder="House, Road, Sector, Uttara, Dhaka"
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      size="lg"
                      variant="default"
                      disabled={submitting}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold px-10 shadow-xl shadow-purple-200"
                    >
                      {submitting ? (
                        <span>{isBn ? "জমা হচ্ছে..." : "Submitting..."}</span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Heart className="w-5 h-5 fill-white" />
                          {t.admission.submitButton}
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: TRACK STATUS */}
          {activeTab === "track" && (
            <div className="space-y-8">
              <Card className="rounded-3xl border border-purple-100 bg-white shadow-md p-6 sm:p-10 space-y-6 max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {t.admission.trackTitle}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBn
                      ? "আবেদন জমা দেওয়ার সময় প্রাপ্ত রেফারেন্স কোডটি প্রদান করুন"
                      : "Enter your application reference code to see real-time status"}
                  </p>
                </div>

                <form onSubmit={handleTrackSubmit} className="flex gap-3">
                  <Input
                    value={searchRef}
                    onChange={(e) => setSearchRef(e.target.value)}
                    placeholder={t.admission.trackPlaceholder}
                    required
                    className="h-13 text-base"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={trackingLoading}
                    className="shrink-0"
                  >
                    {trackingLoading ? <Clock className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                    <span className="ml-2 hidden sm:inline">{t.admission.trackButton}</span>
                  </Button>
                </form>

                {trackError && (
                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{trackError}</span>
                  </div>
                )}
              </Card>

              {trackResult && (
                <Card className="rounded-3xl border-2 border-purple-200 bg-white shadow-xl p-8 max-w-2xl mx-auto space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">Application Reference</p>
                      <h4 className="text-2xl font-black text-purple-700">{trackResult.applicationNo}</h4>
                    </div>
                    <div>
                      {trackResult.status === "approved" && (
                        <Badge variant="green" className="text-sm px-4 py-1.5">
                          ✓ {isBn ? "অনুমোদিত (Approved)" : "Approved"}
                        </Badge>
                      )}
                      {trackResult.status === "under_review" && (
                        <Badge variant="yellow" className="text-sm px-4 py-1.5">
                          ⏳ {isBn ? "পর্যালোচনাধীন (Under Review)" : "Under Review"}
                        </Badge>
                      )}
                      {trackResult.status === "submitted" && (
                        <Badge variant="sky" className="text-sm px-4 py-1.5">
                          📋 {isBn ? "গৃহীত হয়েছে (Submitted)" : "Submitted"}
                        </Badge>
                      )}
                      {trackResult.status === "rejected" && (
                        <Badge variant="destructive" className="text-sm px-4 py-1.5">
                          ✕ {isBn ? "প্রত্যাখ্যাত (Rejected)" : "Rejected"}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3.5 bg-slate-50 rounded-2xl">
                      <p className="text-xs text-slate-500 font-semibold">{isBn ? "শিক্ষার্থীর নাম" : "Child Name"}</p>
                      <p className="font-extrabold text-slate-900 mt-1">{trackResult.childName}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl">
                      <p className="text-xs text-slate-500 font-semibold">{isBn ? "আবেদনের শ্রেণি" : "Applied Class"}</p>
                      <p className="font-extrabold text-slate-900 mt-1">{trackResult.appliedClass}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl">
                      <p className="text-xs text-slate-500 font-semibold">{isBn ? "শিক্ষাবর্ষ" : "Academic Session"}</p>
                      <p className="font-extrabold text-slate-900 mt-1">{trackResult.session}</p>
                    </div>
                    <div className="p-3.5 bg-slate-50 rounded-2xl">
                      <p className="text-xs text-slate-500 font-semibold">{isBn ? "আবেদনের তারিখ" : "Submission Date"}</p>
                      <p className="font-extrabold text-slate-900 mt-1">
                        {new Date(trackResult.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {trackResult.reviewNotes && (
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-sm">
                      <p className="font-bold text-purple-900 mb-1">
                        {isBn ? "স্কুল কর্তৃপক্ষের মন্তব্য:" : "Admin Review Notes:"}
                      </p>
                      <p className="text-purple-700">{trackResult.reviewNotes}</p>
                    </div>
                  )}

                  <div className="text-center pt-2">
                    <Button variant="outline" onClick={() => window.print()} className="gap-2">
                      <Printer className="w-4 h-4" />
                      {isBn ? "আবেদনপত্র প্রিন্ট করুন" : "Print Application Slip"}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
