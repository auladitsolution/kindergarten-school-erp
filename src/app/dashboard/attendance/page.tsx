"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CalendarCheck,
  Save,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  Printer,
  Sparkles,
  Users,
} from "lucide-react";
import { toast } from "sonner";

interface AttendanceItem {
  studentId: string;
  studentName: string;
  rollNo: number;
  classId: string;
  sectionId: string;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
}

export default function AttendancePage() {
  const { isBn } = useLanguage();
  const { user } = useAuth();

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedClass, setSelectedClass] = useState("Play Group");
  const [saving, setSaving] = useState(false);

  const [attendance, setAttendance] = useState<AttendanceItem[]>([
    {
      studentId: "KGS-2026-0001",
      studentName: "Rayan Islam",
      rollNo: 1,
      classId: "Play Group",
      sectionId: "Rose",
      status: "present",
    },
    {
      studentId: "KGS-2026-0004",
      studentName: "Samira Hasan",
      rollNo: 2,
      classId: "Play Group",
      sectionId: "Rose",
      status: "present",
    },
    {
      studentId: "KGS-2026-0005",
      studentName: "Arian Mahmud",
      rollNo: 3,
      classId: "Play Group",
      sectionId: "Rose",
      status: "late",
      remarks: "Traffic delay",
    },
    {
      studentId: "KGS-2026-0006",
      studentName: "Zunairah Khan",
      rollNo: 4,
      classId: "Play Group",
      sectionId: "Rose",
      status: "excused",
      remarks: "Fever note from mother",
    },
  ]);

  const setStatusForStudent = (studentId: string, status: "present" | "absent" | "late" | "excused") => {
    setAttendance((prev) =>
      prev.map((item) => (item.studentId === studentId ? { ...item, status } : item))
    );
  };

  const markAll = (status: "present" | "absent") => {
    setAttendance((prev) => prev.map((item) => ({ ...item, status })));
    toast.info(isBn ? `সকলকে '${status}' চিহ্নিত করা হয়েছে` : `Marked all as ${status}`);
  };

  const handleSaveAttendance = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          attendanceList: attendance,
          recordedBy: user?.name || "Teacher",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isBn ? "হাজিরা সফলভাবে সংরক্ষণ করা হয়েছে!" : "Attendance saved successfully!");
      } else {
        toast.error(data.error || "Failed to save attendance");
      }
    } catch {
      toast.error("Network error while recording attendance");
    } finally {
      setSaving(false);
    }
  };

  const total = attendance.length;
  const presentCount = attendance.filter((a) => a.status === "present").length;
  const absentCount = attendance.filter((a) => a.status === "absent").length;
  const lateCount = attendance.filter((a) => a.status === "late").length;
  const excusedCount = attendance.filter((a) => a.status === "excused").length;
  const percentage = total > 0 ? Math.round(((presentCount + lateCount) / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "দৈনিক শিক্ষার্থী হাজিরা" : "Daily Student Attendance"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "শ্রেণিভিত্তিক উপস্থিতি গ্রহণ ও মাসিক সারসংক্ষেপ"
              : "Mark daily classroom attendance with single-click bulk updates"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => window.print()} className="gap-2">
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">{isBn ? "প্রিন্ট শিট" : "Print Sheet"}</span>
          </Button>

          <Button
            onClick={handleSaveAttendance}
            disabled={saving}
            variant="default"
            className="gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? (isBn ? "সংরক্ষণ হচ্ছে..." : "Saving...") : (isBn ? "হাজিরা সংরক্ষণ করুন" : "Save Attendance")}</span>
          </Button>
        </div>
      </div>

      {/* Control Filters and Quick Actions Bar */}
      <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              {isBn ? "হাজিরার তারিখ:" : "Date:"}
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-10 text-xs w-40"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              {isBn ? "শ্রেণি নির্বাচন:" : "Select Class:"}
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700"
            >
              <option value="Play Group">Play Group (Rose)</option>
              <option value="Nursery">Nursery (Lily)</option>
              <option value="KG">KG (Jasmine)</option>
              <option value="Class 1">Class 1 (Marigold)</option>
            </select>
          </div>
        </div>

        {/* Quick bulk status buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => markAll("present")}
            className="text-xs font-bold text-emerald-700 hover:bg-emerald-50"
          >
            ✓ {isBn ? "সকলকে উপস্থিত" : "Mark All Present"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => markAll("absent")}
            className="text-xs font-bold text-rose-700 hover:bg-rose-50"
          >
            ✕ {isBn ? "সকলকে অনুপস্থিত" : "Mark All Absent"}
          </Button>
        </div>
      </Card>

      {/* Stats summary strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm text-center">
          <p className="text-xs font-bold text-slate-500">{isBn ? "মোট শিক্ষার্থী" : "Total"}</p>
          <p className="text-xl font-black text-slate-900 mt-1">{total}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm text-center">
          <p className="text-xs font-bold text-emerald-700">{isBn ? "উপস্থিত" : "Present"}</p>
          <p className="text-xl font-black text-emerald-700 mt-1">{presentCount}</p>
        </div>
        <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm text-center">
          <p className="text-xs font-bold text-rose-700">{isBn ? "অনুপস্থিত" : "Absent"}</p>
          <p className="text-xl font-black text-rose-700 mt-1">{absentCount}</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-100 shadow-sm text-center">
          <p className="text-xs font-bold text-amber-700">{isBn ? "বিলম্বে" : "Late"}</p>
          <p className="text-xl font-black text-amber-700 mt-1">{lateCount}</p>
        </div>
        <div className="p-3 bg-purple-50 rounded-2xl border border-purple-100 shadow-sm text-center col-span-2 sm:col-span-1">
          <p className="text-xs font-bold text-purple-700">{isBn ? "উপস্থিতি হার" : "Attendance Rate"}</p>
          <p className="text-xl font-black text-purple-700 mt-1">{percentage}%</p>
        </div>
      </div>

      {/* Attendance Sheet Table */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto table-responsive">
          <table className="w-full text-left text-xs text-slate-700 min-w-[650px]">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">{isBn ? "রোল" : "Roll"}</th>
                <th className="py-4 px-6">{isBn ? "শিক্ষার্থীর নাম" : "Student Name"}</th>
                <th className="py-4 px-6 text-center">{isBn ? "হাজিরা স্ট্যাটাস" : "Attendance Status"}</th>
                <th className="py-4 px-6">{isBn ? "মন্তব্য" : "Remarks"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendance.map((item) => (
                <tr key={item.studentId} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-black text-slate-900 text-sm">#{item.rollNo}</td>
                  <td className="py-4 px-6">
                    <p className="font-extrabold text-slate-900 text-sm">{item.studentName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{item.studentId}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setStatusForStudent(item.studentId, "present")}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          item.status === "present"
                            ? "bg-emerald-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-emerald-100"
                        }`}
                      >
                        ✓ {isBn ? "উপস্থিত" : "Present"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatusForStudent(item.studentId, "absent")}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          item.status === "absent"
                            ? "bg-rose-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-rose-100"
                        }`}
                      >
                        ✕ {isBn ? "অনুপস্থিত" : "Absent"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatusForStudent(item.studentId, "late")}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          item.status === "late"
                            ? "bg-amber-500 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-amber-100"
                        }`}
                      >
                        ⏱ {isBn ? "বিলম্বে" : "Late"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setStatusForStudent(item.studentId, "excused")}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                          item.status === "excused"
                            ? "bg-sky-600 text-white shadow-sm"
                            : "bg-slate-100 text-slate-600 hover:bg-sky-100"
                        }`}
                      >
                        📋 {isBn ? "ছুটি" : "Excused"}
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <input
                      type="text"
                      placeholder={isBn ? "মন্তব্য লিখুন..." : "Optional remarks..."}
                      value={item.remarks || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAttendance((prev) =>
                          prev.map((it) =>
                            it.studentId === item.studentId ? { ...it, remarks: val } : it
                          )
                        );
                      }}
                      className="w-full h-8 px-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-purple-300"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
