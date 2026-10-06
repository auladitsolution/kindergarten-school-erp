"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Printer,
  X,
  Baby,
  Phone,
  Mail,
  Home,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { IAdmission } from "@/types";

export default function AdmissionsReviewPage() {
  const { isBn } = useLanguage();
  const [admissions, setAdmissions] = useState<IAdmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeItem, setActiveItem] = useState<IAdmission | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");

  const fetchAdmissions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admissions");
      const data = await res.json();
      if (data.success && data.data?.length) {
        setAdmissions(data.data);
      } else {
        // Fallback sample
        setAdmissions([
          {
            _id: "adm-1",
            applicationNo: "ADM-2026-001",
            appliedClass: "Play Group",
            session: "2026",
            childName: "Tahmid Rahman",
            childNameBn: "তাহমিদ রহমান",
            dob: "2023-05-14",
            gender: "Male",
            bloodGroup: "O+",
            fatherName: "Motiur Rahman",
            fatherPhone: "+8801755123456",
            fatherOccupation: "Chartered Accountant",
            motherName: "Sumona Akter",
            motherPhone: "+8801755123457",
            presentAddress: "House 28, Sector 4, Uttara, Dhaka",
            email: "motiur.rahman@gmail.com",
            status: "under_review",
            reviewNotes: "Birth certificate verified. Invited for campus meet.",
            submittedAt: "2026-10-05T14:30:00Z",
          },
          {
            _id: "adm-2",
            applicationNo: "ADM-2026-002",
            appliedClass: "Nursery",
            session: "2026",
            childName: "Mehvish Alam",
            childNameBn: "মেহবিশ আলম",
            dob: "2022-09-02",
            gender: "Female",
            bloodGroup: "B+",
            fatherName: "Jahangir Alam",
            fatherPhone: "+8801833123456",
            motherName: "Farzana Parveen",
            presentAddress: "Gulshan-2, Dhaka",
            email: "jahangir.alam@corporate.com",
            status: "approved",
            reviewNotes: "Approved by Principal. Ready for enrollment.",
            submittedAt: "2026-10-03T10:15:00Z",
          },
        ]);
      }
    } catch {
      // keep
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const handleUpdateStatus = async (id: string, status: string, enrollNow: boolean = false) => {
    try {
      const res = await fetch(`/api/admissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, reviewNotes, enrollNow }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isBn ? "আবেদনের অবস্থা আপডেট হয়েছে!" : "Application status updated!");
        setActiveItem(null);
        fetchAdmissions();
      }
    } catch {
      toast.error("Failed to update application");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          {isBn ? "অনলাইন ভর্তি আবেদন পর্যালোচনা" : "Online Admission Review"}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          {isBn
            ? "অভিভাবকদের জমাকৃত আবেদনসমূহ যাচাই, অনুমোদন এবং শিক্ষার্থী হিসেবে তালিকাভুক্তকরণ"
            : "Review parent applications, verify documentation, approve and enroll"}
        </p>
      </div>

      {/* Applications Table */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">{isBn ? "রেফারেন্স ও তারিখ" : "Reference & Date"}</th>
                <th className="py-4 px-4">{isBn ? "শিক্ষার্থীর নাম" : "Child Name"}</th>
                <th className="py-4 px-4">{isBn ? "ভর্তির শ্রেণি" : "Applied Class"}</th>
                <th className="py-4 px-4">{isBn ? "পিতা/মাতার নাম ও ফোন" : "Parents & Phone"}</th>
                <th className="py-4 px-4">{isBn ? "অবস্থা" : "Status"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "পদক্ষেপ" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {admissions.map((adm) => (
                <tr key={adm._id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-mono font-black text-purple-700 block">{adm.applicationNo}</span>
                    <span className="text-[11px] text-slate-400">
                      {new Date(adm.submittedAt).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-extrabold text-slate-900 text-sm">{adm.childName}</p>
                    <p className="text-[11px] text-slate-500">DOB: {adm.dob} • {adm.gender}</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-800">{adm.appliedClass}</td>
                  <td className="py-4 px-4">
                    <p className="font-bold text-slate-900">{adm.fatherName}</p>
                    <p className="text-[11px] text-slate-500">{adm.fatherPhone}</p>
                  </td>
                  <td className="py-4 px-4">
                    {adm.status === "enrolled" && <Badge variant="green">{isBn ? "ভর্তি সম্পন্ন" : "Enrolled"}</Badge>}
                    {adm.status === "approved" && <Badge variant="green">{isBn ? "অনুমোদিত" : "Approved"}</Badge>}
                    {adm.status === "under_review" && <Badge variant="yellow">{isBn ? "বিবেচনাধীন" : "Under Review"}</Badge>}
                    {adm.status === "submitted" && <Badge variant="sky">{isBn ? "গৃহীত" : "Submitted"}</Badge>}
                    {adm.status === "rejected" && <Badge variant="destructive">{isBn ? "প্রত্যাখ্যাত" : "Rejected"}</Badge>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setActiveItem(adm);
                        setReviewNotes(adm.reviewNotes || "");
                      }}
                      className="h-8 text-xs font-bold gap-1 text-purple-700 hover:bg-purple-50"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isBn ? "পর্যালোচনা" : "Review"}</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* DETAIL MODAL */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold text-purple-600 font-mono">{activeItem.applicationNo}</p>
                <h3 className="text-xl font-black text-slate-900">
                  {isBn ? "আবেদনপত্রের বিস্তারিত তথ্য" : "Application Review Dossier"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Child Name</span>
                <span className="text-sm font-extrabold text-slate-900">{activeItem.childName}</span>
                <p className="text-slate-600">DOB: {activeItem.dob} • Gender: {activeItem.gender}</p>
                <p className="text-slate-600">Class: <strong>{activeItem.appliedClass}</strong></p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1">
                <span className="text-slate-400 font-bold block uppercase">Parents</span>
                <span className="text-sm font-extrabold text-slate-900">Father: {activeItem.fatherName}</span>
                <p className="text-slate-600">Phone: {activeItem.fatherPhone}</p>
                <p className="text-slate-600">Mother: {activeItem.motherName}</p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-2xl space-y-1 sm:col-span-2">
                <span className="text-slate-400 font-bold block uppercase">Address & Contact</span>
                <p className="text-slate-800">{activeItem.presentAddress}</p>
                <p className="text-slate-600">Email: {activeItem.email}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {isBn ? "অধ্যক্ষ বা এডমিন পর্যালোচনা মন্তব্য:" : "Admin / Principal Review Note:"}
              </label>
              <textarea
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder={isBn ? "মন্তব্য লিখুন..." : "Enter review notes for parent tracking..."}
                className="w-full rounded-2xl border border-slate-200 p-3 text-xs focus:ring-1 focus:ring-purple-300"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleUpdateStatus(activeItem._id!, "rejected")}
              >
                ✕ {isBn ? "প্রত্যাখ্যান" : "Reject"}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(activeItem._id!, "under_review")}
                >
                  ⏳ {isBn ? "বিবেচনাধীন" : "Set Under Review"}
                </Button>

                <Button
                  variant="default"
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 gap-1.5"
                  onClick={() => handleUpdateStatus(activeItem._id!, "approved", true)}
                >
                  <Check className="w-4 h-4" />
                  <span>{isBn ? "অনুমোদন ও সরাসরি ভর্তি" : "Approve & Enroll Child"}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
