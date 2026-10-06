"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Printer,
  Sparkles,
  Star,
  CheckCircle2,
  X,
  FileText,
  GraduationCap,
  Heart,
} from "lucide-react";

interface ExamResultItem {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  section: string;
  rollNo: number;
  examTitle: string;
  subjects: {
    name: string;
    marks: number;
    highest: number;
    grade: string;
  }[];
  skills: {
    skill: string;
    rating: "Star" | "Excellent" | "Good";
  }[];
  teacherRemarks: string;
  averageMarks: number;
  overallGrade: string;
}

export default function ExaminationsPage() {
  const { isBn } = useLanguage();
  const [activeReportStudent, setActiveReportStudent] = useState<ExamResultItem | null>(null);

  const results: ExamResultItem[] = [
    {
      id: "res-1",
      studentId: "KGS-2026-0001",
      studentName: "Rayan Islam",
      className: "Play Group",
      section: "Rose",
      rollNo: 1,
      examTitle: "First Term Evaluation 2026",
      subjects: [
        { name: "English Phonics & Rhymes", marks: 95, highest: 98, grade: "A+" },
        { name: "Colors, Shapes & Math", marks: 92, highest: 96, grade: "A+" },
        { name: "Art & Craft Exploration", marks: 98, highest: 98, grade: "A+" },
        { name: "General Wonder & Nature", marks: 90, highest: 95, grade: "A" },
      ],
      skills: [
        { skill: "Social Sharing & Friendliness", rating: "Star" },
        { skill: "Pencil & Clay Grip", rating: "Excellent" },
        { skill: "Active Listening & Curiosity", rating: "Star" },
        { skill: "Independent Eating & Hygiene", rating: "Good" },
      ],
      teacherRemarks:
        "Rayan is an exceptionally affectionate and lively child. He shows genuine wonder in art and colors!",
      averageMarks: 93.8,
      overallGrade: "A+ (Star Performer)",
    },
    {
      id: "res-2",
      studentId: "KGS-2026-0002",
      studentName: "Anika Tabassum",
      className: "Nursery",
      section: "Lily",
      rollNo: 2,
      examTitle: "First Term Evaluation 2026",
      subjects: [
        { name: "English Phonics & Reading", marks: 96, highest: 98, grade: "A+" },
        { name: "Basic Numeracy (1-20)", marks: 94, highest: 96, grade: "A+" },
        { name: "Bangla Rhymes & Alphabet", marks: 97, highest: 98, grade: "A+" },
        { name: "Drawing & Coloring", marks: 95, highest: 98, grade: "A+" },
      ],
      skills: [
        { skill: "Speech & Fluent Expression", rating: "Star" },
        { skill: "Fine Motor & Drawing Skills", rating: "Star" },
        { skill: "Classroom Etiquette", rating: "Excellent" },
        { skill: "Group Play & Cooperation", rating: "Star" },
      ],
      teacherRemarks:
        "Anika sings nursery rhymes beautifully and possesses wonderful memory. Keep shining!",
      averageMarks: 95.5,
      overallGrade: "A+ (Outstanding)",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "মূল্যায়ন, পরীক্ষা ও প্রগ্রেস কার্ড" : "Examinations & Skill Assessments"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "কিন্ডারগার্টেন দক্ষতাভিত্তিক মূল্যায়ন ও প্রিন্টযোগ্য প্রগ্রেস রিপোর্ট কার্ড"
              : "Developmental skill tracking, subject evaluation & printable A4 report cards"}
          </p>
        </div>
      </div>

      {/* Results Table */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">{isBn ? "রোল ও শিক্ষার্থী" : "Roll & Student"}</th>
                <th className="py-4 px-4">{isBn ? "শ্রেণি" : "Class"}</th>
                <th className="py-4 px-4">{isBn ? "পরীক্ষার নাম" : "Exam Title"}</th>
                <th className="py-4 px-4">{isBn ? "গড় নম্বর" : "Average"}</th>
                <th className="py-4 px-4">{isBn ? "সামগ্রিক গ্রেড" : "Overall Grade"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "পদক্ষেপ" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((res) => (
                <tr key={res.id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-extrabold text-slate-900 text-sm">
                      #{res.rollNo} {res.studentName}
                    </p>
                    <p className="text-[11px] text-purple-600 font-mono">{res.studentId}</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">
                    {res.className} ({res.section})
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-600">{res.examTitle}</td>
                  <td className="py-4 px-4 font-black text-slate-900 text-sm">{res.averageMarks}%</td>
                  <td className="py-4 px-4">
                    <Badge variant="purple" className="font-bold">{res.overallGrade}</Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => setActiveReportStudent(res)}
                      className="h-8 gap-1.5 text-xs font-bold bg-purple-600 hover:bg-purple-700"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>{isBn ? "রিপোর্ট কার্ড" : "Report Card"}</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* PRINTABLE PROGRESS REPORT CARD MODAL */}
      {activeReportStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between no-print">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isBn ? "শিক্ষার্থী মূল্যায়ন প্রগ্রেস কার্ড" : "Student Progress Report Card"}
              </h3>
              <button
                type="button"
                onClick={() => setActiveReportStudent(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* THE REPORT CARD ITSELF */}
            <div className="rounded-3xl border-4 border-purple-500 bg-white p-6 sm:p-8 space-y-6 text-slate-900 relative">
              {/* Header */}
              <div className="text-center pb-4 border-b-2 border-purple-200 space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-black text-purple-950 uppercase tracking-tight">
                  BLOOM KINDERGARTEN & JUNIOR ACADEMY
                </h4>
                <p className="text-xs text-slate-500">
                  Plot 14, Road 11, Sector 4, Uttara, Dhaka-1230 • Academic Year 2026
                </p>
                <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-black text-xs uppercase tracking-wider mt-1">
                  {activeReportStudent.examTitle}
                </span>
              </div>

              {/* Student Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Student Name</span>
                  <span className="font-black text-slate-900">{activeReportStudent.studentName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Student ID</span>
                  <span className="font-black font-mono">{activeReportStudent.studentId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Class & Section</span>
                  <span className="font-bold">{activeReportStudent.className} ({activeReportStudent.section})</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase text-[10px]">Roll No</span>
                  <span className="font-black">#{activeReportStudent.rollNo}</span>
                </div>
              </div>

              {/* Subject Marks Table */}
              <div>
                <h5 className="font-black text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Academic Subject Evaluations
                </h5>
                <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-purple-50 text-purple-950 font-bold">
                    <tr>
                      <th className="p-2.5 text-left">Subject</th>
                      <th className="p-2.5 text-center">Marks Obtained</th>
                      <th className="p-2.5 text-center">Highest</th>
                      <th className="p-2.5 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeReportStudent.subjects.map((sub, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-bold text-slate-800">{sub.name}</td>
                        <td className="p-2.5 text-center font-extrabold text-purple-700">{sub.marks}</td>
                        <td className="p-2.5 text-center text-slate-500">{sub.highest}</td>
                        <td className="p-2.5 text-center font-black">{sub.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Kindergarten Developmental Skill Ratings */}
              <div>
                <h5 className="font-black text-xs uppercase tracking-wider text-slate-500 mb-2">
                  Developmental & Behavioral Milestones
                </h5>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {activeReportStudent.skills.map((sk, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between"
                    >
                      <span className="font-semibold text-slate-700">{sk.skill}</span>
                      <Badge variant="purple" className="text-[10px]">
                        ★ {sk.rating}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Remarks & Overall Grade */}
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-purple-900 uppercase">Overall Standing:</span>
                  <span className="font-black text-purple-700 text-sm">{activeReportStudent.overallGrade}</span>
                </div>
                <p className="text-xs text-slate-700 italic">
                  <strong>Teacher's Remark:</strong> "{activeReportStudent.teacherRemarks}"
                </p>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex items-center justify-between text-xs border-t border-slate-200">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="text-slate-500 text-[10px]">Class Teacher</span>
                </div>
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="text-slate-500 text-[10px]">Principal</span>
                </div>
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="text-slate-500 text-[10px]">Guardian Signature</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 no-print">
              <Button variant="outline" onClick={() => setActiveReportStudent(null)}>
                {isBn ? "বন্ধ করুন" : "Close"}
              </Button>
              <Button
                variant="default"
                onClick={() => window.print()}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Printer className="w-4 h-4" />
                <span>{isBn ? "রিপোর্ট কার্ড প্রিন্ট করুন" : "Print Report Card"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
