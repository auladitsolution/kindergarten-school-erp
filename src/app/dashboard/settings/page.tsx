"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Shield,
  Database,
  History,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

export default function SettingsAndAuditPage() {
  const { isBn } = useLanguage();
  const [seeding, setSeeding] = useState(false);

  const auditLogs = [
    {
      id: "1",
      action: "FEE_PAYMENT_RECORDED",
      user: "Kamrul Hasan (Accountant)",
      module: "Finance",
      details: "Recorded ৳5,500 for student Rayan Islam (INV-2026-0001) via bKash",
      time: "2026-10-06 17:42:10",
    },
    {
      id: "2",
      action: "ATTENDANCE_BATCH_SUBMIT",
      user: "Nusrat Jahan (Teacher)",
      module: "Attendance",
      details: "Marked daily attendance for Play Group - Rose (18 Present, 1 Late)",
      time: "2026-10-06 09:15:30",
    },
    {
      id: "3",
      action: "ADMISSION_APPLICATION_APPROVED",
      user: "Begum Rashida Khan (Principal)",
      module: "Admissions",
      details: "Approved admission application ADM-2026-002 for Mehvish Alam",
      time: "2026-10-05 14:10:00",
    },
    {
      id: "4",
      action: "NOTICE_PUBLISHED",
      user: "Admin Office",
      module: "Communication",
      details: "Published notice: Autumn Joy Fest & Color Day celebration",
      time: "2026-10-04 11:00:22",
    },
  ];

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      toast.success(data.message || "Database seeded successfully!");
    } catch {
      toast.error("Failed to seed database");
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isBn ? "সিস্টেম সেটিংস ও অডিট লগ" : "System Settings & Audit Trace"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isBn
            ? "নিরাপত্তা নিরীক্ষা, সেশন কনফিগারেশন এবং ডাটাবেস সমন্বয়"
            : "Compliance security logs, role verification and system configuration"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Security & Database Status Card */}
        <Card className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-purple-700" />
            <h3 className="font-extrabold text-slate-900 text-base">
              {isBn ? "নিরাপত্তা ও কনফিগারেশন স্ট্যাটাস" : "Security & Environment Status"}
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-600">Database Engine:</span>
              <Badge variant="green">MongoDB Atlas (Pooled)</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-600">Authentication Service:</span>
              <Badge variant="green">Firebase Auth + Admin SDK</Badge>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-600">Timezone Normalization:</span>
              <span className="font-bold text-slate-800">Asia/Dhaka (+06:00)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
              <span className="font-semibold text-slate-600">Active Academic Session:</span>
              <span className="font-bold text-purple-700">2026 - 2027</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleSeedDatabase}
              disabled={seeding}
              variant="outline"
              className="w-full gap-2 text-xs font-bold"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${seeding ? "animate-spin" : ""}`} />
              <span>{isBn ? "ডাটাবেস টেস্ট সিড যাচাই" : "Re-Sync / Seed Test Data"}</span>
            </Button>
          </div>
        </Card>

        {/* Audit Logs Summary */}
        <Card className="p-6 rounded-3xl border border-sky-100 bg-white shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <History className="w-5 h-5 text-sky-700" />
            <h3 className="font-extrabold text-slate-900 text-base">
              {isBn ? "সাম্প্রতিক অডিট লগ ট্রেইল" : "Real-Time Audit Trail"}
            </h3>
          </div>

          <div className="space-y-2.5">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] py-0 font-mono">
                    {log.action}
                  </Badge>
                  <span className="text-[10px] text-slate-400">{log.time}</span>
                </div>
                <p className="text-slate-800 font-medium text-[11px]">{log.details}</p>
                <p className="text-[10px] text-purple-700 font-bold">{log.user}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
