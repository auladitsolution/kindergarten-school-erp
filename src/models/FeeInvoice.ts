import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFeeInvoiceDocument extends Document {
  invoiceNo: string;
  studentId: string;
  studentName?: string;
  classId: string;
  className?: string;
  month: string;
  academicYear: string;
  dueDate: string;
  items: {
    feeType: string;
    amount: number;
  }[];
  totalAmount: number;
  discount: number;
  payableAmount: number;
  paidAmount: number;
  balance: number;
  status: "paid" | "partial" | "unpaid";
  createdAt: Date;
  updatedAt: Date;
}

const FeeInvoiceSchema = new Schema<IFeeInvoiceDocument>(
  {
    invoiceNo: { type: String, required: true, unique: true, index: true },
    studentId: { type: String, required: true, index: true },
    studentName: { type: String },
    classId: { type: String, required: true },
    className: { type: String },
    month: { type: String, required: true },
    academicYear: { type: String, required: true },
    dueDate: { type: String, required: true },
    items: [
      {
        feeType: { type: String, required: true },
        amount: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0 },
    payableAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    balance: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["paid", "partial", "unpaid"],
      default: "unpaid",
      index: true,
    },
  },
  { timestamps: true }
);

export const FeeInvoiceModel: Model<IFeeInvoiceDocument> =
  mongoose.models.FeeInvoice ||
  mongoose.model<IFeeInvoiceDocument>("FeeInvoice", FeeInvoiceSchema);
