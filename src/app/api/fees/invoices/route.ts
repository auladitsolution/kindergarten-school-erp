import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FeeInvoiceModel } from "@/models/FeeInvoice";
import { generateInvoiceNumber } from "@/lib/utils";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const query: Record<string, any> = status && status !== "all" ? { status } : {};

    const invoices = await FeeInvoiceModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: invoices });
  } catch (error: any) {
    console.error("GET /api/fees/invoices error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      studentId,
      studentName,
      classId,
      className,
      month,
      dueDate,
      items,
      discount = 0,
    } = body;

    if (!studentId || !month || !items || !items.length) {
      return NextResponse.json(
        { success: false, error: "Please fill in all invoice details." },
        { status: 400 }
      );
    }

    const totalAmount = items.reduce((sum: number, it: any) => sum + Number(it.amount), 0);
    const payableAmount = Math.max(0, totalAmount - Number(discount));
    const count = await FeeInvoiceModel.countDocuments();
    const invoiceNo = generateInvoiceNumber(count + 1);

    const invoice = await FeeInvoiceModel.create({
      invoiceNo,
      studentId,
      studentName,
      classId: classId || "Play Group",
      className: className || "Play Group",
      month,
      academicYear: "2026",
      dueDate: dueDate || "2026-10-15",
      items,
      totalAmount,
      discount: Number(discount),
      payableAmount,
      paidAmount: 0,
      balance: payableAmount,
      status: "unpaid",
    });

    return NextResponse.json({ success: true, data: invoice });
  } catch (error: any) {
    console.error("POST /api/fees/invoices error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
