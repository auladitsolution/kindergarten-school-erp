"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  DollarSign,
  PlusCircle,
  Receipt,
  Search,
  CheckCircle2,
  AlertCircle,
  Printer,
  CreditCard,
  X,
  FileText,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { IFeeInvoice } from "@/types";

export default function FeesManagementPage() {
  const { isBn, locale } = useLanguage();
  const { user } = useAuth();

  const [invoices, setInvoices] = useState<IFeeInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // Modals state
  const [isNewInvoiceOpen, setIsNewInvoiceOpen] = useState(false);
  const [activePaymentInvoice, setActivePaymentInvoice] = useState<IFeeInvoice | null>(null);
  const [activeReceiptInvoice, setActiveReceiptInvoice] = useState<IFeeInvoice | null>(null);

  // Payment recording form state
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank" | "bkash" | "nagad">("bkash");
  const [transactionRef, setTransactionRef] = useState("");

  // New invoice form state
  const [newInvoiceData, setNewInvoiceData] = useState({
    studentId: "KGS-2026-0001",
    studentName: "Rayan Islam",
    className: "Play Group",
    month: "November 2026",
    dueDate: "2026-11-15",
    tuitionFee: 4500,
    transportFee: 0,
    activityFee: 1000,
    discount: 0,
  });

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/fees/invoices");
      const data = await res.json();
      if (data.success && data.data?.length) {
        setInvoices(data.data);
      } else {
        // Sample baseline
        setInvoices([
          {
            _id: "inv-1",
            invoiceNo: "INV-2026-0001",
            studentId: "KGS-2026-0001",
            studentName: "Rayan Islam",
            classId: "Play Group",
            className: "Play Group",
            academicYear: "2026",
            month: "October 2026",
            dueDate: "2026-10-15",
            items: [
              { feeType: "Monthly Tuition Fee", amount: 4500 },
              { feeType: "Creative Activity & Snacks", amount: 1200 },
            ],
            totalAmount: 5700,
            discount: 200,
            payableAmount: 5500,
            paidAmount: 5500,
            balance: 0,
            status: "paid",
          },
          {
            _id: "inv-2",
            invoiceNo: "INV-2026-0002",
            studentId: "KGS-2026-0002",
            studentName: "Anika Tabassum",
            classId: "Nursery",
            className: "Nursery",
            academicYear: "2026",
            month: "October 2026",
            dueDate: "2026-10-15",
            items: [
              { feeType: "Monthly Tuition Fee", amount: 5000 },
              { feeType: "Air-Conditioned Transport", amount: 2500 },
            ],
            totalAmount: 7500,
            discount: 0,
            payableAmount: 7500,
            paidAmount: 4000,
            balance: 3500,
            status: "partial",
          },
          {
            _id: "inv-3",
            invoiceNo: "INV-2026-0003",
            studentId: "KGS-2026-0003",
            studentName: "Zayan Chowdhury",
            classId: "KG",
            className: "KG",
            academicYear: "2026",
            month: "October 2026",
            dueDate: "2026-10-15",
            items: [
              { feeType: "Monthly Tuition Fee", amount: 5500 },
              { feeType: "Science Discovery Kit", amount: 1500 },
            ],
            totalAmount: 7000,
            discount: 0,
            payableAmount: 7000,
            paidAmount: 0,
            balance: 7000,
            status: "unpaid",
          },
        ]);
      }
    } catch {
      // Keep state
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePaymentInvoice) return;

    try {
      const res = await fetch("/api/fees/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: activePaymentInvoice._id,
          amount: Number(paymentAmount),
          paymentMethod,
          transactionRef,
          verifiedByName: user?.name || "Accountant",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isBn ? "পেমেন্ট সফলভাবে সংরক্ষিত হয়েছে!" : "Payment recorded successfully!");
        setActivePaymentInvoice(null);
        setPaymentAmount("");
        setTransactionRef("");
        fetchInvoices();
      } else {
        toast.error(data.error || "Failed to record payment");
      }
    } catch {
      toast.error("Network error while recording payment");
    }
  };

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    const items = [
      { feeType: "Monthly Tuition Fee", amount: Number(newInvoiceData.tuitionFee) },
    ];
    if (newInvoiceData.transportFee > 0) {
      items.push({ feeType: "School Transport Fee", amount: Number(newInvoiceData.transportFee) });
    }
    if (newInvoiceData.activityFee > 0) {
      items.push({ feeType: "Activity & Snacks", amount: Number(newInvoiceData.activityFee) });
    }

    try {
      const res = await fetch("/api/fees/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: newInvoiceData.studentId,
          studentName: newInvoiceData.studentName,
          className: newInvoiceData.className,
          month: newInvoiceData.month,
          dueDate: newInvoiceData.dueDate,
          items,
          discount: Number(newInvoiceData.discount),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(isBn ? "ইনভয়েস তৈরি হয়েছে!" : "Invoice generated successfully!");
        setIsNewInvoiceOpen(false);
        fetchInvoices();
      } else {
        toast.error(data.error || "Failed to create invoice");
      }
    } catch {
      toast.error("Error creating invoice");
    }
  };

  const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.payableAmount, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paidAmount, 0);
  const totalDues = invoices.reduce((sum, inv) => sum + inv.balance, 0);

  const filtered = invoices.filter(
    (inv) => statusFilter === "all" || inv.status === statusFilter
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isBn ? "ফি ও আর্থিক ব্যবস্থাপনা" : "Fees & Financial Management"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {isBn
              ? "শিক্ষার্থী ফি ইনভয়েস, বিকাশ/ক্যাশ আদায় ও মানি রিসিট প্রিন্ট"
              : "Generate invoices, record cash/bKash receipts & track balances"}
          </p>
        </div>

        <Button
          onClick={() => setIsNewInvoiceOpen(true)}
          variant="default"
          className="gap-2 bg-purple-600 hover:bg-purple-700 shadow-md shadow-purple-200"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isBn ? "নতুন ইনভয়েস তৈরি" : "Create New Invoice"}</span>
        </Button>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card className="p-6 rounded-3xl border border-slate-100 bg-white shadow-sm">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isBn ? "মোট ইনভয়েসকৃত ফি" : "Total Invoiced"}
          </p>
          <h3 className="text-2xl font-black text-slate-900 mt-2">
            {formatCurrency(totalInvoiced, locale)}
          </h3>
          <p className="text-[11px] text-purple-600 font-semibold mt-1">
            {invoices.length} {isBn ? "টি ইনভয়েস" : "Invoices"}
          </p>
        </Card>

        <Card className="p-6 rounded-3xl border border-emerald-100 bg-emerald-50/50 shadow-sm">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {isBn ? "আদায়কৃত অর্থ" : "Total Collected"}
          </p>
          <h3 className="text-2xl font-black text-emerald-800 mt-2">
            {formatCurrency(totalPaid, locale)}
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            {Math.round((totalPaid / (totalInvoiced || 1)) * 100)}% {isBn ? "আদায় সম্পন্ন" : "Collected"}
          </p>
        </Card>

        <Card className="p-6 rounded-3xl border border-rose-100 bg-rose-50/50 shadow-sm">
          <p className="text-xs font-bold text-rose-700 uppercase tracking-wider">
            {isBn ? "বকেয়া ব্যালেন্স" : "Outstanding Dues"}
          </p>
          <h3 className="text-2xl font-black text-rose-800 mt-2">
            {formatCurrency(totalDues, locale)}
          </h3>
          <p className="text-[11px] text-rose-600 font-semibold mt-1">
            {isBn ? "তাকা প্রদান আবশ্যক" : "Action required"}
          </p>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2">
        {["all", "paid", "partial", "unpaid"].map((st) => (
          <button
            key={st}
            type="button"
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
              statusFilter === st
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-purple-50 border border-slate-200"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <Card className="rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase tracking-wider font-extrabold text-[11px]">
              <tr>
                <th className="py-4 px-6">{isBn ? "ইনভয়েস নং" : "Invoice No"}</th>
                <th className="py-4 px-4">{isBn ? "শিক্ষার্থী ও শ্রেণি" : "Student & Class"}</th>
                <th className="py-4 px-4">{isBn ? "মাস" : "Month"}</th>
                <th className="py-4 px-4">{isBn ? "নির্ধারিত ফি" : "Payable"}</th>
                <th className="py-4 px-4">{isBn ? "পরিশোধিত" : "Paid"}</th>
                <th className="py-4 px-4">{isBn ? "বকেয়া" : "Due"}</th>
                <th className="py-4 px-4">{isBn ? "অবস্থা" : "Status"}</th>
                <th className="py-4 px-6 text-right">{isBn ? "পদক্ষেপ" : "Actions"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((inv) => (
                <tr key={inv._id} className="hover:bg-purple-50/40 transition-colors">
                  <td className="py-4 px-6 font-mono font-black text-purple-700">{inv.invoiceNo}</td>
                  <td className="py-4 px-4">
                    <p className="font-extrabold text-slate-900">{inv.studentName}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{inv.studentId}</p>
                  </td>
                  <td className="py-4 px-4 font-bold text-slate-700">{inv.month}</td>
                  <td className="py-4 px-4 font-black text-slate-900">{formatCurrency(inv.payableAmount, locale)}</td>
                  <td className="py-4 px-4 font-bold text-emerald-700">{formatCurrency(inv.paidAmount, locale)}</td>
                  <td className="py-4 px-4 font-bold text-rose-600">{formatCurrency(inv.balance, locale)}</td>
                  <td className="py-4 px-4">
                    {inv.status === "paid" && <Badge variant="green">{isBn ? "পরিশোধিত" : "Paid"}</Badge>}
                    {inv.status === "partial" && <Badge variant="yellow">{isBn ? "আংশিক" : "Partial"}</Badge>}
                    {inv.status === "unpaid" && <Badge variant="destructive">{isBn ? "বকেয়া" : "Unpaid"}</Badge>}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {inv.balance > 0 && (
                        <Button
                          variant="sky"
                          size="sm"
                          onClick={() => {
                            setActivePaymentInvoice(inv);
                            setPaymentAmount(String(inv.balance));
                          }}
                          className="h-8 text-xs font-bold px-2.5 shadow-xs"
                        >
                          <DollarSign className="w-3.5 h-3.5 mr-1" />
                          <span>{isBn ? "টাকা জমা" : "Pay"}</span>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveReceiptInvoice(inv)}
                        className="h-8 text-xs font-bold px-2.5"
                      >
                        <Receipt className="w-3.5 h-3.5 mr-1" />
                        <span>{isBn ? "রসিদ" : "Receipt"}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL 1: RECORD PAYMENT */}
      {activePaymentInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-slate-900">
                {isBn ? "পেমেন্ট রেকর্ড করুন" : "Record Fee Payment"}
              </h3>
              <button
                type="button"
                onClick={() => setActivePaymentInvoice(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl text-xs space-y-1">
              <p><strong>{isBn ? "ইনভয়েস:" : "Invoice:"}</strong> {activePaymentInvoice.invoiceNo}</p>
              <p><strong>{isBn ? "শিক্ষার্থী:" : "Student:"}</strong> {activePaymentInvoice.studentName} ({activePaymentInvoice.studentId})</p>
              <p><strong>{isBn ? "বর্তমান বকেয়া:" : "Remaining Due:"}</strong> <span className="font-bold text-rose-600">{formatCurrency(activePaymentInvoice.balance, locale)}</span></p>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? "জমার পরিমাণ (টাকা) *" : "Payment Amount (BDT) *"}
                </label>
                <Input
                  type="number"
                  required
                  max={activePaymentInvoice.balance}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? "পেমেন্ট মেথড *" : "Payment Method *"}
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e: any) => setPaymentMethod(e.target.value)}
                  className="w-full h-11 rounded-2xl border border-slate-200 px-3 text-sm font-semibold"
                >
                  <option value="bkash">বিকাশ (bKash)</option>
                  <option value="nagad">নগদ (Nagad)</option>
                  <option value="cash">ক্যাশ (Cash Counter)</option>
                  <option value="bank">ব্যাংক ট্রান্সফার (Bank)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isBn ? "ট্রানজেকশন রেফারেন্স / নোট" : "Transaction TrxID / Ref"}
                </label>
                <Input
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="e.g. 9J283KS02P"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setActivePaymentInvoice(null)}>
                  {isBn ? "বাতিল" : "Cancel"}
                </Button>
                <Button type="submit" variant="default" className="bg-emerald-600 hover:bg-emerald-700">
                  {isBn ? "পেমেন্ট নিশ্চিত করুন" : "Confirm Payment"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINTABLE MONEY RECEIPT / CHALLAN */}
      {activeReceiptInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between no-print">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {isBn ? "ফি আদায় ডিজিটাল রসিদ" : "Official Fee Receipt"}
              </h3>
              <button
                type="button"
                onClick={() => setActiveReceiptInvoice(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* THE PRINTABLE RECEIPT */}
            <div className="rounded-2xl border-2 border-slate-300 p-6 space-y-5 bg-white text-slate-900">
              <div className="text-center pb-4 border-b-2 border-slate-200">
                <h4 className="font-black text-xl text-purple-900">
                  BLOOM KINDERGARTEN ACADEMY
                </h4>
                <p className="text-[11px] text-slate-600">
                  Plot 14, Road 11, Sector 4, Uttara, Dhaka-1230 • Phone: 01711223344
                </p>
                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-slate-100 font-mono font-bold text-xs uppercase tracking-wider">
                  Money Receipt: {activeReceiptInvoice.invoiceNo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-500 font-bold">Student Name:</p>
                  <p className="font-black text-slate-900 text-sm">{activeReceiptInvoice.studentName}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold">Student ID:</p>
                  <p className="font-black font-mono">{activeReceiptInvoice.studentId}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold">Class / Month:</p>
                  <p className="font-bold">{activeReceiptInvoice.className} • {activeReceiptInvoice.month}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-bold">Date of Issue:</p>
                  <p className="font-bold">{new Date().toLocaleDateString()}</p>
                </div>
              </div>

              {/* Items Breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold">
                    <tr>
                      <th className="p-2 text-left">Fee Description</th>
                      <th className="p-2 text-right">Amount (BDT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeReceiptInvoice.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2">{it.feeType}</td>
                        <td className="p-2 text-right font-bold">৳{it.amount}</td>
                      </tr>
                    ))}
                    {activeReceiptInvoice.discount > 0 && (
                      <tr className="text-emerald-700">
                        <td className="p-2">Scholarship / Discount</td>
                        <td className="p-2 text-right">-৳{activeReceiptInvoice.discount}</td>
                      </tr>
                    )}
                    <tr className="bg-slate-50 font-black">
                      <td className="p-2">Total Payable</td>
                      <td className="p-2 text-right">৳{activeReceiptInvoice.payableAmount}</td>
                    </tr>
                    <tr className="text-emerald-700 font-black">
                      <td className="p-2">Amount Paid</td>
                      <td className="p-2 text-right">৳{activeReceiptInvoice.paidAmount}</td>
                    </tr>
                    <tr className="text-rose-600 font-black">
                      <td className="p-2">Remaining Balance</td>
                      <td className="p-2 text-right">৳{activeReceiptInvoice.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Signatures */}
              <div className="pt-8 flex items-center justify-between text-xs border-t border-slate-200">
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="text-slate-500 text-[10px]">Accounts Officer</span>
                </div>
                <div className="text-center">
                  <div className="w-28 border-b border-slate-400 mb-1"></div>
                  <span className="text-slate-500 text-[10px]">Principal Signature</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 no-print">
              <Button variant="outline" onClick={() => setActiveReceiptInvoice(null)}>
                {isBn ? "বন্ধ করুন" : "Close"}
              </Button>
              <Button
                variant="default"
                onClick={() => window.print()}
                className="gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Printer className="w-4 h-4" />
                <span>{isBn ? "রসিদ প্রিন্ট করুন" : "Print Receipt"}</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
