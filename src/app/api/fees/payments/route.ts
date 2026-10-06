import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { FeeInvoiceModel } from "@/models/FeeInvoice";
import { PaymentModel } from "@/models/Payment";

export async function POST(req: Request) {
  try {
    await connectDB();
    const {
      invoiceId,
      amount,
      paymentMethod,
      transactionRef,
      verifiedByName,
      notes,
    } = await req.json();

    if (!invoiceId || !amount || !paymentMethod) {
      return NextResponse.json(
        { success: false, error: "Invoice ID, amount and payment method are required." },
        { status: 400 }
      );
    }

    const invoice = await FeeInvoiceModel.findById(invoiceId);
    if (!invoice) {
      return NextResponse.json(
        { success: false, error: "Invoice not found." },
        { status: 404 }
      );
    }

    const payNum = Number(amount);
    const newPaid = Number(invoice.paidAmount) + payNum;
    const newBalance = Math.max(0, Number(invoice.payableAmount) - newPaid);
    const newStatus = newBalance === 0 ? "paid" : "partial";

    // Create payment record
    const payment = await PaymentModel.create({
      paymentRef: `PAY-${Date.now().toString().slice(-6)}`,
      invoiceId: invoice._id.toString(),
      invoiceNo: invoice.invoiceNo,
      studentId: invoice.studentId,
      studentName: invoice.studentName,
      amount: payNum,
      paymentMethod,
      transactionRef,
      verifiedByName: verifiedByName || "Accountant Kamrul",
      status: "verified",
      paymentDate: new Date().toISOString().split("T")[0],
      notes,
    });

    // Update invoice
    invoice.paidAmount = newPaid;
    invoice.balance = newBalance;
    invoice.status = newStatus;
    await invoice.save();

    return NextResponse.json({
      success: true,
      message: "Payment successfully recorded!",
      payment,
      updatedInvoice: invoice,
    });
  } catch (error: any) {
    console.error("POST /api/fees/payments error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
