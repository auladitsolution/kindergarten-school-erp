"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  GraduationCap,
  PlusCircle,
  Search,
  Phone,
  Mail,
  BookOpen,
  Calendar,
  DollarSign,
  X,
  UserCheck,
} from "lucide-react";
import { toast } from "sonner";
import { ITeacher } from "@/types";

export default function TeachersManagementPage() {
  const { isBn } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [teachers, setTeachers] = useState<ITeacher[]>([
    {
      employeeId: "EMP-2026-001",
      name: "Nusrat Jahan",
      nameBn: "নুসরাত জাহান",
      designation: "Senior Kindergarten Educator",
      qualification: "B.Ed, M.A in English (DU)",
      joiningDate: "2023-01-10",
      phone: "+8801711223344",
      email: "nusrat.teacher@bloomkindergarten.edu.bd",
      assignedClasses: ["Play Group", "KG"],
      assignedSubjects: ["English Phonics", "Art & Craft"],
      salary: 45000,
      isClassTeacher: true,
      classTeacherOf: "Play Group - Rose",
      photoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400",
    },
    {
      employeeId: "EMP-2026-002",
      name: "Farzana Haque",
      nameBn: "ফারজানা হক",
      designation: "Assistant Teacher (Numeracy)",
      qualification: "B.Sc in Mathematics, Montessori Certified",
      joiningDate: "2023-03-15",
      phone: "+8801811334455",
      email: "farzana.teacher@bloomkindergarten.edu.bd",
      assignedClasses: ["Nursery", "KG"],
      assignedSubjects: ["Basic Math", "Storytelling"],
      salary: 40000,
      isClassTeacher: true,
      classTeacherOf: "Nursery - Lily",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    },
    {
      employeeId: "EMP-2026-003",
      name: "Mahfuzur Rahman",
      nameBn: "মাহফুজুর রহমান",
      designation: "Physical Education Coordinator",
      qualification: "B.P.Ed, Certified Child Fitness Coach",
      joiningDate: "2024-01-05",
      phone: "+8801911445566",
      email: "mahfuz.teacher@bloomkindergarten.edu.bd",
      assignedClasses: ["All Classes"],
      assignedSubjects: ["Physical Education", "Music & Movement"],
      salary: 38000,
      isClassTeacher: false,
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    },
    {
      employeeId: "EMP-2026-004",
      name: "Sabrina Akter",
      nameBn: "সাবরিনা আক্তার",
      designation: "Language Specialist",
      qualification: "M.A in Linguistics (JU)",
      joiningDate: "2024-02-01",
      phone: "+8801611556677",
      email: "sabrina.teacher@bloomkindergarten.edu.bd",
      assignedClasses: ["Nursery", "Class 1"],
      assignedSubjects: ["Bangla Rhymes", "English Phonics"],
      salary: 42000,
      isClassTeacher: true,
      classTeacherOf: "Class 1 - Marigold",
      photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    designation: "Assistant Teacher",
    qualification: "B.A in Education",
    phone: "",
    email: "",
    assignedClasses: "Play Group",
    assignedSubjects: "General Knowledge",
    salary: 35000,
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: ITeacher = {
      employeeId: `EMP-2026-00${teachers.length + 1}`,
      name: formData.name,
      designation: formData.designation,
      qualification: formData.qualification,
      joiningDate: new Date().toISOString().split("T")[0],
      phone: formData.phone,
      email: formData.email,
      assignedClasses: [formData.assignedClasses],
      assignedSubjects: [formData.assignedSubjects],
      salary: Number(formData.salary),
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    };

    setTeachers([...teachers, newEmp]);
    toast.success(isBn ? "নতুন শিক্ষক সফলভাবে যুক্ত হয়েছেন!" : "Teacher added successfully!");
    setIsAddOpen(false);
  };

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "শিক্ষক ও কর্মকর্তা ব্যবস্থাপনা" : "Faculty & Staff Directory"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "শিক্ষক প্রোফাইল, দায়িত্বপ্রাপ্ত শ্রেণি ও বেতন বিবরণী"
              : "Teacher profiles, class assignments, qualifications & payroll records"}
          </p>
        </div>

        <Button
          onClick={() => setIsAddOpen(true)}
          variant="default"
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isBn ? "নতুন শিক্ষক নিয়োগ" : "Add Faculty Member"}</span>
        </Button>
      </div>

      {/* Search Bar */}
      <Card className="p-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? "নাম বা আইডি দিয়ে খুঁজুন..." : "Search by name or employee ID..."}
            className="pl-10 h-10 text-xs rounded-xl"
          />
        </div>
      </Card>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((t) => (
          <Card key={t.employeeId} className="p-6 rounded-3xl border border-purple-100 bg-white shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            <img
              src={t.photoUrl || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200"}
              alt={t.name}
              className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-100 shadow-xs shrink-0"
            />

            <div className="space-y-2 text-center sm:text-left flex-1">
              <div>
                <span className="font-mono text-[10px] font-extrabold text-purple-600 block">{t.employeeId}</span>
                <h3 className="font-black text-slate-900 text-lg leading-tight">{t.name}</h3>
                <p className="text-xs font-bold text-slate-600">{t.designation}</p>
              </div>

              <p className="text-xs text-slate-500 font-medium">{t.qualification}</p>

              <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                <p><strong>{isBn ? "শ্রেণি:" : "Classes:"}</strong> {t.assignedClasses.join(", ")}</p>
                <p><strong>{isBn ? "মোবাইল:" : "Phone:"}</strong> {t.phone}</p>
                <p><strong>{isBn ? "ইমেইল:" : "Email:"}</strong> {t.email}</p>
                {t.isClassTeacher && (
                  <Badge variant="purple" className="mt-1">
                    ★ {isBn ? "শ্রেণি শিক্ষক" : "Class Teacher"}: {t.classTeacherOf}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ADD MODAL */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBn ? "নতুন শিক্ষক নিবন্ধন" : "Register Faculty Member"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{isBn ? "পূর্ণ নাম *" : "Full Name *"}</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mahbuba Akhter"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "পদবী *" : "Designation *"}</label>
                  <Input
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "যোগ্যতা *" : "Qualification *"}</label>
                  <Input
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "ফোন নম্বর *" : "Phone *"}</label>
                  <Input
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+88017XXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">{isBn ? "ইমেইল *" : "Email *"}</label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="teacher@bloom.edu.bd"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>
                  {isBn ? "বাতিল" : "Cancel"}
                </Button>
                <Button type="submit" variant="default" className="bg-purple-600 hover:bg-purple-700">
                  {isBn ? "সংরক্ষণ করুন" : "Save Teacher"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
