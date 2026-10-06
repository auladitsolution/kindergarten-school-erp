"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  PlusCircle,
  Search,
  Printer,
  Edit,
  Trash2,
  X,
  CreditCard,
  Phone,
  Calendar,
  Heart,
  Baby,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { IStudent } from "@/types";

export default function StudentsPage() {
  const { isBn, locale } = useLanguage();
  const [students, setStudents] = useState<IStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClassFilter, setSelectedClassFilter] = useState("all");

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [activeCardStudent, setActiveCardStudent] = useState<IStudent | null>(null);

  // New Student Form
  const [formData, setFormData] = useState({
    name: "",
    nameBn: "",
    className: "Play Group",
    sectionName: "Rose",
    rollNo: 1,
    dob: "2023-04-12",
    gender: "Male" as const,
    bloodGroup: "B+",
    guardianName: "",
    guardianPhone: "",
    emergencyContact: "",
    address: "Uttara, Dhaka",
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/students");
      const data = await res.json();
      if (data.success) {
        setStudents(data.data);
      }
    } catch {
      // Fallback initial sample list if DB connecting
      setStudents([
        {
          studentId: "KGS-2026-0001",
          admissionNo: "ADM-2026-101",
          name: "Rayan Islam",
          nameBn: "রায়ান ইসলাম",
          classId: "play",
          className: "Play Group",
          sectionId: "rose",
          sectionName: "Rose",
          rollNo: 1,
          dob: "2023-04-12",
          gender: "Male",
          bloodGroup: "B+",
          address: "House 42, Road 7, Sector 3, Uttara, Dhaka",
          guardianId: "g1",
          guardianName: "Mohammad Rafiqul Islam",
          guardianPhone: "+8801712345678",
          admissionDate: "2026-01-05",
          academicYear: "2026",
          enrollmentStatus: "active",
          emergencyContact: "+8801712345678",
          photoUrl: "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=400&auto=format&fit=crop&q=80",
        },
        {
          studentId: "KGS-2026-0002",
          admissionNo: "ADM-2026-102",
          name: "Anika Tabassum",
          nameBn: "আনিকা তাবাসসুম",
          classId: "nursery",
          className: "Nursery",
          sectionId: "lily",
          sectionName: "Lily",
          rollNo: 2,
          dob: "2022-08-20",
          gender: "Female",
          bloodGroup: "O+",
          address: "Apartment 5B, Dhanmondi, Dhaka",
          guardianId: "g2",
          guardianName: "Dr. Nazmul Huda",
          guardianPhone: "+8801812345678",
          admissionDate: "2026-01-06",
          academicYear: "2026",
          enrollmentStatus: "active",
          emergencyContact: "+8801812345678",
          photoUrl: "https://images.unsplash.com/photo-1543332164-6e82f355badc?w=400&auto=format&fit=crop&q=80",
        },
        {
          studentId: "KGS-2026-0003",
          admissionNo: "ADM-2026-103",
          name: "Zayan Chowdhury",
          nameBn: "জায়ান চৌধুরী",
          classId: "kg",
          className: "KG",
          sectionId: "jasmine",
          sectionName: "Jasmine",
          rollNo: 3,
          dob: "2021-11-15",
          gender: "Male",
          bloodGroup: "A+",
          address: "Plot 18, Block B, Bashundhara R/A, Dhaka",
          guardianId: "g3",
          guardianName: "Sharmin Sultana",
          guardianPhone: "+8801912345678",
          admissionDate: "2026-01-07",
          academicYear: "2026",
          enrollmentStatus: "active",
          emergencyContact: "+8801912345678",
          photoUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&auto=format&fit=crop&q=80",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          classId: formData.className,
          sectionId: formData.sectionName,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isBn ? "নতুন শিক্ষার্থী সফলভাবে যুক্ত হয়েছে!" : "Student enrolled successfully!");
        setIsAddOpen(false);
        fetchStudents();
      } else {
        toast.error(data.error || "Failed to add student");
      }
    } catch {
      toast.error("Error connecting to server");
    }
  };

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(s.rollNo).includes(searchTerm);

    const matchesClass =
      selectedClassFilter === "all" || s.className?.toLowerCase() === selectedClassFilter.toLowerCase();

    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "শিক্ষার্থী ব্যবস্থাপনা" : "Student Management"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "শিক্ষার্থী প্রোফাইল, তথ্য সম্পাদনা ও ডিজিটাল আইডি কার্ড প্রিন্ট"
              : "Complete student profiles, enrollment records & ID card generator"}
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          variant="default"
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isBn ? "নতুন শিক্ষার্থী ভর্তি" : "Enroll New Student"}</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? "নাম, আইডি বা রোল দিয়ে খুঁজুন..." : "Search by name, ID or roll..."}
            className="pl-10 h-10 text-xs rounded-xl"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
            {isBn ? "শ্রেণি ফিল্টার:" : "Class:"}
          </span>
          <select
            value={selectedClassFilter}
            onChange={(e) => setSelectedClassFilter(e.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700"
          >
            <option value="all">{isBn ? "সকল শ্রেণি" : "All Classes"}</option>
            <option value="Play Group">Play Group</option>
            <option value="Nursery">Nursery</option>
            <option value="KG">KG</option>
            <option value="Class 1">Class 1</option>
          </select>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">{isBn ? "শিক্ষার্থী ও আইডি" : "Student & ID"}</th>
                <th className="py-4 px-4">{isBn ? "শ্রেণি ও সেকশন" : "Class & Section"}</th>
                <th className="py-4 px-4">{isBn ? "রোল" : "Roll"}</th>
                <th className="py-4 px-4">{isBn ? "অভিভাবক ও ফোন" : "Guardian & Phone"}</th>
                <th className="py-4 px-4">{isBn ? "রক্তের গ্রুপ" : "Blood"}</th>
                <th className="py-4 px-4">{isBn ? "অবস্থা" : "Status"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "পদক্ষেপ" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => (
                <tr key={s.studentId} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.photoUrl || "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=100"}
                        alt={s.name}
                        className="w-10 h-10 rounded-xl object-cover border border-purple-100 shadow-xs shrink-0"
                      />
                      <div>
                        <p className="font-extrabold text-slate-900 text-sm">{s.name}</p>
                        <p className="text-[11px] font-semibold text-purple-600 font-mono">{s.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-slate-800">{s.className}</span>
                    <span className="text-[11px] text-slate-500 block">Sec: {s.sectionName}</span>
                  </td>
                  <td className="py-4 px-4 font-black text-slate-900">{s.rollNo}</td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-800">{s.guardianName}</p>
                    <p className="text-[11px] text-slate-500">{s.guardianPhone}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="outline" className="font-bold">{s.bloodGroup || "O+"}</Badge>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="green" className="text-[11px]">Active</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveCardStudent(s)}
                        className="h-8 gap-1.5 text-xs font-bold text-purple-700 hover:bg-purple-50 hover:border-purple-300"
                        title={isBn ? "আইডি কার্ড দেখুন" : "View ID Card"}
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">{isBn ? "আইডি কার্ড" : "ID Card"}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-bold">{isBn ? "কোনো শিক্ষার্থী পাওয়া যায়নি" : "No students found."}</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL 1: ADD NEW STUDENT */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    {isBn ? "নতুন শিক্ষার্থী ভর্তি ফরম" : "New Student Enrollment"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isBn ? "সকল তথ্য সঠিকভাবে পূরণ করুন" : "Fill in all mandatory details"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "পূর্ণ নাম (English) *" : "Full Name *"}
                  </label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Samira Hasan"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "শ্রেণি *" : "Class *"}
                  </label>
                  <select
                    value={formData.className}
                    onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-3 text-sm font-semibold"
                  >
                    <option value="Play Group">Play Group</option>
                    <option value="Nursery">Nursery</option>
                    <option value="KG">KG</option>
                    <option value="Class 1">Class 1</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "সেকশন *" : "Section *"}
                  </label>
                  <select
                    value={formData.sectionName}
                    onChange={(e) => setFormData({ ...formData, sectionName: e.target.value })}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-3 text-sm font-semibold"
                  >
                    <option value="Rose">Rose</option>
                    <option value="Lily">Lily</option>
                    <option value="Tulip">Tulip</option>
                    <option value="Jasmine">Jasmine</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "রোল নম্বর *" : "Roll No *"}
                  </label>
                  <Input
                    type="number"
                    required
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "রক্তের গ্রুপ" : "Blood Group"}
                  </label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full h-12 rounded-2xl border border-slate-200 px-3 text-sm font-semibold"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "অভিভাবকের নাম *" : "Guardian Name *"}
                  </label>
                  <Input
                    required
                    value={formData.guardianName}
                    onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                    placeholder="e.g. Hasan Mahmud"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isBn ? "জরুরি মোবাইল নম্বর *" : "Emergency Phone *"}
                  </label>
                  <Input
                    required
                    value={formData.emergencyContact}
                    onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                    placeholder="+88017XXXXXXXX"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  {isBn ? "বাতিল" : "Cancel"}
                </Button>
                <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-700">
                  {isBn ? "ভর্তি নিশ্চিত করুন" : "Enroll Student"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE STUDENT ID CARD */}
      {activeCardStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between no-print">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isBn ? "ডিজিটাল আইডি কার্ড" : "Digital Student ID Card"}
              </h3>
              <button
                type="button"
                onClick={() => setActiveCardStudent(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* THE ID CARD ITSELF */}
            <div className="rounded-3xl border-4 border-purple-500 bg-gradient-to-b from-purple-50 via-white to-purple-50/50 p-6 shadow-lg text-center relative overflow-hidden">
              {/* Header */}
              <div className="space-y-1 pb-4 border-b border-purple-100">
                <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="font-black text-purple-900 text-base tracking-tight mt-1">
                  Bloom Kindergarten Academy
                </h4>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Student Identity Card
                </p>
              </div>

              {/* Photo & Name */}
              <div className="py-4 space-y-3">
                <img
                  src={activeCardStudent.photoUrl || "https://images.unsplash.com/photo-1595454223600-91fb55979d46?w=200"}
                  alt={activeCardStudent.name}
                  className="w-24 h-24 rounded-2xl object-cover mx-auto border-3 border-purple-400 shadow-md"
                />

                <div>
                  <h5 className="text-xl font-black text-slate-900 leading-tight">
                    {activeCardStudent.name}
                  </h5>
                  <p className="text-xs font-black text-purple-700 tracking-wider font-mono mt-0.5">
                    ID: {activeCardStudent.studentId}
                  </p>
                </div>
              </div>

              {/* Key metadata grid */}
              <div className="grid grid-cols-2 gap-2 text-left bg-white p-3.5 rounded-2xl border border-purple-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Class / Sec</span>
                  <span className="font-bold text-slate-800">{activeCardStudent.className} ({activeCardStudent.sectionName})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Roll No</span>
                  <span className="font-bold text-slate-800">#{activeCardStudent.rollNo}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Blood Group</span>
                  <span className="font-bold text-rose-600">{activeCardStudent.bloodGroup || "O+"}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Emergency</span>
                  <span className="font-bold text-slate-800">{activeCardStudent.emergencyContact}</span>
                </div>
              </div>

              {/* Barcode representation */}
              <div className="pt-4 space-y-1">
                <div className="h-7 w-3/4 mx-auto bg-slate-900 rounded-sm flex items-center justify-around px-2 opacity-80">
                  <span className="w-1 h-full bg-white"></span>
                  <span className="w-2 h-full bg-white"></span>
                  <span className="w-1 h-full bg-white"></span>
                  <span className="w-3 h-full bg-white"></span>
                  <span className="w-1 h-full bg-white"></span>
                  <span className="w-2 h-full bg-white"></span>
                </div>
                <p className="text-[9px] text-slate-400 font-bold tracking-widest">
                  SECTOR 4, UTTARA, DHAKA • 01711223344
                </p>
              </div>
            </div>

            {/* Print trigger */}
            <div className="flex justify-end gap-3 no-print">
              <Button variant="outline" onClick={() => setActiveCardStudent(null)}>
                {isBn ? "বন্ধ করুন" : "Close"}
              </Button>
              <Button
                variant="default"
                onClick={() => window.print()}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Printer className="w-4 h-4" />
                <span>{isBn ? "প্রিন্ট করুন" : "Print ID Card"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
