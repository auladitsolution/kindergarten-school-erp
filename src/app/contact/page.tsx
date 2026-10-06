"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PlayfulBackground, SectionBadge } from "@/components/shared/PlayfulDecorations";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const { isBn } = useLanguage();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success(isBn ? "আপনার বার্তা সফলভাবে পাঠানো হয়েছে!" : "Your message has been sent successfully!");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-playful-mesh">
      <PlayfulBackground />
      <Navbar />

      <main className="relative z-10 flex-1 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <SectionBadge text={isBn ? "যোগাযোগ ও ক্যাম্পাস" : "Contact & Campus"} color="purple" />
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
              {isBn ? "ক্যাম্পাস ঘুরে দেখতে চলে আসুন যে কোনো দিন" : "We Would Love to Welcome You to Campus"}
            </h1>
            <p className="text-slate-600 text-lg">
              {isBn
                ? "ভর্তি পরামর্শ, ক্যাম্পাস ভিজিট বা যে কোনো তথ্যের জন্য আমাদের সাথে যোগাযোগ করুন।"
                : "Schedule a guided tour or reach out to our admission counselors."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Cards */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="p-8 rounded-3xl border border-purple-100 bg-white shadow-md space-y-6">
                <h3 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4">
                  {isBn ? "যোগাযোগের ঠিকানা" : "Campus Location & Reach"}
                </h3>

                <div className="space-y-5 text-sm text-slate-700">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{isBn ? "ক্যাম্পাস ঠিকানা" : "Campus Address"}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {isBn
                          ? "প্লট ১৪, রোড ১১, সেক্টর ৪, উত্তরা মডেল টাউন, ঢাকা-১২৩০"
                          : "Plot 14, Road 11, Sector 4, Uttara Model Town, Dhaka-1230"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{isBn ? "টেলিফোন ও হটলাইন" : "Admission Hotline"}</h4>
                      <p className="text-xs text-slate-600 mt-1">+880 1711-223344</p>
                      <p className="text-xs text-slate-600">+880 1811-556677</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{isBn ? "অফিসিয়াল ইমেইল" : "Email Inquiries"}</h4>
                      <p className="text-xs text-slate-600 mt-1">info@bloomkindergarten.edu.bd</p>
                      <p className="text-xs text-slate-600">admission@bloomkindergarten.edu.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{isBn ? "অফিস ও ভিজিটিং সময়" : "Visiting Hours"}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        {isBn ? "রবিবার - বৃহস্পতিবার: সকাল ৮:০০ - বিকাল ৩:০০" : "Sunday - Thursday: 8:00 AM - 3:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Interactive Message Form */}
            <div className="lg:col-span-7">
              <Card className="p-8 sm:p-10 rounded-3xl border border-sky-100 bg-white shadow-md space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {isBn ? "সরাসরি বার্তা পাঠান" : "Send Us a Direct Message"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isBn ? "আমরা ২৪ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করব" : "Our counselors typically respond within 24 hours"}
                    </p>
                  </div>
                </div>

                {sent ? (
                  <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                    <h4 className="font-extrabold text-slate-900 text-xl">
                      {isBn ? "ধন্যবাদ! বার্তাটি পাঠানো হয়েছে" : "Thank you! Message Sent"}
                    </h4>
                    <p className="text-slate-600 text-sm">
                      {isBn ? "আমাদের প্রতিনিধি দ্রুতই আপনার সাথে যোগাযোগ করবেন।" : "We will get in touch with you shortly."}
                    </p>
                    <Button variant="outline" onClick={() => setSent(false)} className="mt-2">
                      {isBn ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? "আপনার নাম *" : "Your Name *"}
                        </label>
                        <Input
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder={isBn ? "উদাঃ মোঃ আনিসুর রহমান" : "e.g. John Doe"}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? "মোবাইল নম্বর *" : "Phone Number *"}
                        </label>
                        <Input
                          required
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="+88017XXXXXXXX"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? "ইমেইল ঠিকানা" : "Email Address"}
                        </label>
                        <Input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="parent@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          {isBn ? "বিষয় *" : "Inquiry Subject *"}
                        </label>
                        <Input
                          required
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          placeholder={isBn ? "উদাঃ ভর্তি সংক্রান্ত তথ্য" : "e.g. Admission Inquiry"}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {isBn ? "আপনার বার্তা / প্রশ্ন *" : "Your Message *"}
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus-visible:border-purple-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200"
                        placeholder={isBn ? "বিস্তারিত লিখুন..." : "Type your message here..."}
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <Button type="submit" variant="default" size="lg" className="gap-2 px-8">
                        <Send className="w-4 h-4" />
                        <span>{isBn ? "বার্তা পাঠান" : "Send Message"}</span>
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
